import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import './Layout.css'

export const Layout = ({
  width,
  name,
  images,
  setImages,
  justification,
  setJustification,
  margins,
  setMargins,
  borders,
  setBorders,
  handleChange,
  ...props
}) => {
  const totalLength = Object.values(images).length

  const layoutRef = useRef()

  const displayedImages = Object.entries(images).filter(
    ([key, image]) => image.display,
  )

  const removedImages = Object.entries(images).filter(
    ([key, image]) => !image.display && image.url,
  )

  const { length } = displayedImages

  useEffect(() => {
    const layout = layoutRef.current.getBoundingClientRect()
    const layoutWidth = layout.width - 2
    const layoutHeight = layout.height - 2
    setImages({
      ...images,
      layoutWidth,
      layoutHeight,
      ratio: !length ? layoutWidth / 300 : layoutWidth / layoutHeight,
    })
  }, [length])

  return (
    <div
      style={{ width: width, marginTop: '10px', marginBottom: '40px' }}
      className="field"
      name={name}
      {...props}
    >
      <LayoutButtons
        length={length}
        margins={margins}
        setMargins={setMargins}
        justification={justification}
        setJustification={setJustification}
        borders={borders}
        setBorders={setBorders}
      />

      <div
        className="layout"
        style={{
          justifyContent: justification,
          border: length ? `solid 1px hsl(0, 0%, 92%)` : 'none',
        }}
        ref={layoutRef}
      >
        {displayedImages.map(([key, image], i) => (
          <Image
            images={images}
            setImages={setImages}
            image={image}
            key={key}
            keyName={key}
            color={`hsl(0, 0%, ${((length - i) / length) * 90}%)`}
            length={length}
            margins={margins}
            borders={borders}
            layoutRef={layoutRef}
            i={i}
          />
        ))}
      </div>

      <AddButton
        length={length}
        onClick={() => {
          const layout = layoutRef.current.getBoundingClientRect()
          const layoutWidth = layout.width - 2
          setImages({
            ...images,
            [`img${totalLength}`]: {
              url: '',
              id: totalLength,
              display: true,
              imageWidth: layoutWidth,
              imageHeight: 300,
            },
          })
        }}
      />

      <SaveButton length={length} onClick={handleChange} />

      {removedImages.length > 0 && (
        <RemovedImages
          removedImages={removedImages}
          images={images}
          setImages={setImages}
          layoutRef={layoutRef}
        />
      )}
    </div>
  )
}

const LayoutButtons = ({
  length,
  margins,
  setMargins,
  justification,
  setJustification,
  borders,
  setBorders,
}) => (
  <div
    className="layout-buttons"
    style={{
      opacity: length ? '1' : '0.25',
    }}
  >
    <LayoutButton
      length={length}
      state={margins}
      setState={setMargins}
      text="Marges"
      toggle
    />
    <Justification
      justification={justification}
      setJustification={setJustification}
      length={length}
    />
    <LayoutButton
      length={length}
      state={borders}
      setState={setBorders}
      text="Bordure"
      toggle
    />
  </div>
)

const LayoutButton = ({ state, setState, length, text, toggle, value }) => {
  const isSelected = toggle ? state : state === value
  return (
    <div
      style={{
        background: isSelected ? '#fbd052' : 'grey',
        cursor: length ? 'pointer' : 'default',
        width: toggle ? '15%' : '30%',
      }}
      className="button layout-button"
      onClick={() => length && setState(toggle ? !state : value)}
    >
      {text}
    </div>
  )
}

const Justification = ({ justification, setJustification, length }) => {
  const justifications = ['flex-start', 'center', 'flex-end']

  return (
    <div className="justify-buttons">
      {justifications.map(value => (
        <LayoutButton
          length={length}
          state={justification}
          setState={setJustification}
          value={value}
          text={
            (value === 'flex-start' && 'Gauche') ||
            (value === 'flex-end' && 'Droite') ||
            'Centre'
          }
          key={value}
        />
      ))}
    </div>
  )
}

const Image = ({
  images,
  setImages,
  image,
  keyName,
  color,
  length,
  layoutRef,
  margins,
  borders,
  i,
  ...props
}) => {
  const [hasMouseDown, setHasMouseDown] = useState(false)
  const ref = useRef()

  const resize = useCallback(
    e => {
      const layout = layoutRef.current.getBoundingClientRect()
      const layoutWidth = layout.width - 2
      const layoutHeight = layout.height - 2
      const ratio = length && layoutWidth / layoutHeight

      const imageWidth = e.pageX - ref.current.getBoundingClientRect().left + 5
      const imageHeight = e.pageY - ref.current.getBoundingClientRect().top + 5

      if (hasMouseDown.both) {
        ref.current.style.width = imageWidth + 'px'
        ref.current.style.height = imageHeight + 'px'
        setImages({
          ...images,
          [keyName]: {
            ...image,
            imageWidth,
            imageHeight,
          },
          layoutHeight,
          ratio: ratio,
        })
      }

      if (hasMouseDown.right) {
        ref.current.style.width = imageWidth + 'px'
        setImages({
          ...images,
          [keyName]: {
            ...image,
            imageWidth,
          },
          layoutHeight,
          ratio: ratio,
        })
      }

      if (hasMouseDown.down) {
        ref.current.style.height = imageHeight + 'px'
        setImages({
          ...images,
          [keyName]: {
            ...image,
            imageHeight,
          },
          layoutHeight,
          ratio: ratio,
        })
      }
    },
    [hasMouseDown.right, hasMouseDown.down, hasMouseDown.both, layoutRef],
  )

  useEffect(() => {
    if (hasMouseDown) {
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', () => setHasMouseDown(false))
    }
    return () => {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', () => setHasMouseDown(false))
    }
  }, [hasMouseDown, resize])

  const { url, display } = image

  const sixMultiple = (i + 1) % 6 === 0

  const displayWidth =
    image.imageWidth || (margins && 'calc(100% - 0.7rem)') || '100%'

  const displayHeight = image.imageHeight || '300px'

  const displayMargin = margins ? '0.35rem' : 0

  const removedHeight =
    layoutRef.current &&
    !display &&
    (15 / 100) * layoutRef.current.getBoundingClientRect().width

  return (
    <div
      className={`image ${display ? 'displayed' : 'removed'}`}
      ref={ref}
      style={{
        background: `center / cover no-repeat ${
          display
            ? `url(${url}), ${color}`
            : `linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${url})`
        }`,
        width: display ? displayWidth : '15%',
        height: display ? displayHeight : removedHeight,
        margin: display
          ? displayMargin
          : `0 ${sixMultiple ? '0' : '2%'} 1rem 0`,
        border: borders ? 'solid 1px hsl(0, 0%, 40%)' : 'none',
        alignSelf: image.alignSelf,
      }}
      {...props}
    >
      {display ? (
        <Controllers
          setImages={setImages}
          images={images}
          keyName={keyName}
          image={image}
          setHasMouseDown={setHasMouseDown}
          imgRef={ref}
        />
      ) : (
        <PutBackButton
          onClick={() =>
            setImages({ ...images, [keyName]: { ...image, display: true } })
          }
        />
      )}
    </div>
  )
}

const positions = ['right', 'corner', 'down']

const Controllers = ({
  images,
  setImages,
  image,
  keyName,
  setHasMouseDown,
  imgRef,
}) => (
  <Fragment>
    <RemoveButton
      action={() => {
        setImages({ ...images, [keyName]: { ...image, display: false } })
      }}
    />

    <Icon
      up
      imgRef={imgRef}
      action={() => {
        imgRef.current.style.alignSelf = 'flex-start'
        setImages({
          ...images,
          [keyName]: { ...image, alignSelf: 'flex-start' },
        })
      }}
    />

    <UrlInput
      onChange={e => {
        setImages({
          ...images,
          [keyName]: { ...image, url: e.target.value },
        })
      }}
      value={image.url}
    />

    <Icon
      down
      imgRef={imgRef}
      action={() => {
        imgRef.current.style.alignSelf = 'flex-end'
        setImages({
          ...images,
          [keyName]: { ...image, alignSelf: 'flex-end' },
        })
      }}
    />

    {positions.map(position => (
      <Handler
        position={position}
        setHasMouseDown={setHasMouseDown}
        key={position}
      />
    ))}
  </Fragment>
)

const AddButton = ({ length, ...props }) => (
  <div
    style={{
      height: length === 0 ? '362px' : '35px',
      marginTop: length ? '25px' : 0,
    }}
    className="button add-button"
    {...props}
  >
    + Ajouter une nouvelle image
  </div>
)

const SaveButton = ({ length, ...props }) => (
  <div
    style={{
      height: '35px',
      marginTop: '10px',
      opacity: length ? 1 : 0.3,
    }}
    className="button add-button"
    {...props}
  >
    Enregistrer la composition
  </div>
)

const RemoveButton = ({ action }) => (
  <div className="remove-button">
    <Icon close action={action} />
  </div>
)

const PutBackButton = props => (
  <div className="put-back-button" {...props}>
    Remettre
  </div>
)

const UrlInput = props => (
  <input type="text" placeholder="URL de l'image" {...props} />
)

const Icon = ({ up, down, close, action }) => (
  <svg class="icon" onClick={action} width="40px" viewBox="0 0 130 130">
    <path
      fill="none"
      stroke="white"
      strokeWidth={6}
      className="svg-path"
      d={
        (up && 'M17.35 55.4L65 7.75l47.65 47.65M65 122.75V8.41') ||
        (down && 'M114.65 73.1L67 120.75 19.35 73.1M67 5.75v114.34') ||
        (close && 'M24 24l82 82M106 24l-82 82')
      }
    />
  </svg>
)

const Handler = ({ position, setHasMouseDown }) => (
  <div
    className={`handler handler-${position}`}
    onMouseDown={() => {
      setHasMouseDown({
        both: position === 'corner',
        right: position === 'right',
        down: position === 'down',
      })
    }}
  >
    {position === 'corner' ? (
      <div className="handler-item-corner" key={position}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 100 100"
          width="16px"
        >
          <path
            d="M0 100L104-4M32.75 100l104-104M65.5 100l104-104"
            fill="none"
            stroke="#fbd052"
            strokeWidth={8}
          />
        </svg>
      </div>
    ) : (
      [...Array(3)].map((e, i) => (
        <div className={`handler-item-${position}`} key={`${position}-${i}`} />
      ))
    )}
  </div>
)

const RemovedImages = ({ removedImages, images, setImages, layoutRef }) => (
  <div className="removed-block">
    Images retirées
    <div className="removed-images">
      {removedImages.map(([key, image], i) => (
        <Image
          key={key}
          image={image}
          images={images}
          setImages={setImages}
          keyName={key}
          layoutRef={layoutRef}
          i={i}
        />
      ))}
    </div>
  </div>
)

export const LayoutRender = ({
  images,
  justification,
  margins,
  borders,
  layoutWidth,
  ...props
}) => {
  const layoutRef = useRef()

  const [layout, setLayout] = useState({})

  const resize = useCallback(() => {
    setLayout({
      width: layoutRef.current.getBoundingClientRect().width,
      height: layoutRef.current.getBoundingClientRect().width / images.ratio,
    })
  }, [layoutRef, images])

  useEffect(() => {
    if (!layoutRef || !layoutRef.current) return
    setLayout({
      width: layoutRef.current.getBoundingClientRect().width,
      height: layoutRef.current.getBoundingClientRect().width / images.ratio,
    })

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', () => resize)
    }
  }, [layoutRef, images, resize])

  if (!images) return null

  return (
    <div
      className="layout"
      ref={layoutRef}
      style={{
        justifyContent: justification,
        width: layoutWidth,
        height: layout.height,
      }}
    >
      {images &&
        Object.values(images)
          .filter(({ display }) => display)
          .map(({ url, imageHeight, imageWidth, alignSelf }, i) => {
            const percentageW = (100 * imageWidth) / images.layoutWidth
            const percentageH = (100 * imageHeight) / images.layoutHeight
            return (
              <div
                key={i}
                className={`image`}
                style={{
                  background: `center / cover no-repeat ${`url(${url})`}`,
                  width: `${percentageW}%`,
                  height: `${percentageH}%`,
                  margin: margins ? '0.35rem' : 0,
                  border: borders ? 'solid 1px hsl(0, 0%, 40%)' : 'none',
                  alignSelf: alignSelf,
                }}
                {...props}
              />
            )
          })}
    </div>
  )
}

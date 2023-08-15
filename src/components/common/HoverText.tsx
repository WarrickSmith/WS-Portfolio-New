const HoverText = ({ words }: { words: string[] }) => {
  return (
    <>
      {words.map((word, index) => (
        <span key={index} style={{ color: index === 0 ? 'white' : 'var(--color-alt)' }}>
          {word}
          {'\u00A0'}
        </span>
      ))}
    </>
  )
}

export default HoverText


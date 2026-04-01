import WordSlider from '../common/WordSlider'

const words = ['full stack', 'developer']

const NameCard = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-bg-card text-text-primary uppercase">
      <p className="text-body-sm font-normal">Hi There! - I&apos;m</p>
      <h2 className="my-2 text-center text-display font-bold">Warrick Smith</h2>
      <WordSlider words={words} />
    </div>
  )
}

export default NameCard

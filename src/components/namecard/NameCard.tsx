import WordSlider from '../common/WordSlider'

const words = ['full stack', 'developer']

const NameCard = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-transparent p-6 text-center text-text-primary uppercase tablet:p-8 desktop:p-10">
      <p className="text-body-sm font-normal tracking-[0.18em] text-text-secondary">
        Hi There! - I&apos;m
      </p>
      <h2 className="my-2 text-center text-display font-bold">Warrick Smith</h2>
      <WordSlider words={words} />
    </div>
  )
}

export default NameCard

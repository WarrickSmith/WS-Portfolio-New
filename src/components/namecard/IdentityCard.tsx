import backgroundImage from '../../assets/warrick.jpg'
import { cn } from '../../lib/cn'
import WordSlider from '../common/WordSlider'

const words = ['full stack', 'developer']

const IdentityCard = () => {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-3 bg-transparent p-6 text-center text-text-primary uppercase',
        'tablet:flex-row tablet:gap-6 tablet:p-8 tablet:text-left',
        'desktop:flex-col desktop:gap-4 desktop:p-10 desktop:text-center'
      )}
    >
      <div
        className={cn(
          'hidden aspect-square w-20 shrink-0 overflow-hidden rounded-full',
          'tablet:block tablet:w-28',
          'desktop:block desktop:w-32'
        )}
      >
        <img
          src={backgroundImage}
          alt="Portrait of Warrick Smith"
          className="h-full w-full rounded-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col items-center gap-3 tablet:items-start desktop:items-center">
        <p className="text-body-sm font-normal tracking-[0.18em] text-text-secondary">
          Hi There! - I&apos;m
        </p>
        <h1 className="my-2 text-display font-bold">Warrick Smith</h1>
        <WordSlider words={words} />
      </div>
    </div>
  )
}

export default IdentityCard

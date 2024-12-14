import cssScrollFooter from './ScrollFooter.module.css';

type Props = {
  scrollSectionRef: React.RefObject<HTMLElement>;
};

function ScrollFooter({ scrollSectionRef }: Props) {
  return (
    <div className={cssScrollFooter.footer}>
      <div className={cssScrollFooter.scrollTop + ' color3'}>
        <button
          className={cssScrollFooter.actArea}
          onClick={() => scrollSectionRef?.current?.scrollTo({ top: 0, behavior: 'smooth' })}
        ></button>
      </div>
    </div>
  );
}

export default ScrollFooter;

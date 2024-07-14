import ListLe from './components/listLe/ListLe.tsx';
import ForkLoL from './components/forkLe/ForkLe.tsx';
import ListName from './components/listName/ListName.tsx';
import Footer from './components/footer/Footer.tsx';

import { useUiState } from '../../zustand.ts';
import cssLe from './Le.module.css';

// import '../../components/container.css';
// import cssLoL from './LoL.module.css';

export default function Le({}: Props) {
  //Zustand
  const { page } = useUiState();

  return (
    <>
      <div className={cssLe.warpLe + (page === 'le' || page === 'lol' ? null : ' ' + cssLe.opacity0)}>
        <ListName />
        <ForkLoL />

        <Footer />
        <div className={cssLe.scrollFade}></div>
        <div className={cssLe.scrollWrap + ' ' + (page == 'le' ? 'scrollWrapOn' : 'scrollWrapOff')}>
          <ListLe />
        </div>
      </div>
    </>
  );
}

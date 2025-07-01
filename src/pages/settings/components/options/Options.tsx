import React from 'react';
import Btnback from '../../../../components/btnBack/Btnback';
import ImprtExprtList from './components/imprtExprtList/ImprtExprtList';

import cssOptions from './Options.module.css';

type Props = {
  page: string;
  setAllDateLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  expandedOptn: boolean;
  setExpandedOptn: React.Dispatch<React.SetStateAction<boolean>>;
  setPopupIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPopupChild: React.Dispatch<React.SetStateAction<JSX.Element>>;
};

export default function Options({
  page,
  setAllDateLoaded,
  setPage,
  expandedOptn,
  setExpandedOptn,
  setPopupIsOpen,
  setPopupChild,
}: Props) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [origin, setOrigin] = React.useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const btnRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const btnsOptions = React.useRef<any[]>([
    {
      text: 'export / import - list',
      onClick: (i: number) => {
        handleClick(i);
      },
    },
    {
      text: 'export / import - profile',
      onClick: (i: number) => {
        console.log('export/import - profile');
        handleClick(i);
      },
    },
    {
      text: 'password & mail',
      onClick: (i: number) => {
        console.log('password & mail');
        handleClick(i);
      },
    },
    {
      text: 'themes',
      onClick: (i: number) => {
        console.log('themes');
        handleClick(i);
      },
    },
    {
      text: 'Achives',
      onClick: (i: number) => {
        console.log('Achives');
        handleClick(i);
      },
    },
    {
      text: 'subscribe',
      onClick: (i: number) => {
        console.log('subscribe');
        handleClick(i);
      },
    },
    {
      text: 'log out',
      onClick: () => {
        //* Хорошо было бы оставлять то что не смогло отправится на сервер
        //* Но тогда нужно переделывать логику сохранения этих врменных данных на LS добавляя туда userId,
        //* чтобы елси потом другой user зайдет чужой кещ кому надо по id полетел.
        localStorage.clear();
        setAllDateLoaded(false);
        setPage('auth');
      },
    },
  ]);

  React.useEffect(() => {
    if (activeIndex !== null) {
      const timer = setTimeout(() => {
        setExpandedOptn(true);
      }, 1);

      return () => clearTimeout(timer); // Чистим, если компонент размонтируется
    } else {
      setExpandedOptn(false);
    }
  }, [activeIndex]);

  const randBtnSwing = React.useRef<number[]>(btnsOptions.current.map(() => 10 + Math.random() * 100));

  // Clear
  const prevPageRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    const prevPage = prevPageRef.current;

    if (prevPage === 'settings' && page !== 'settings') {
      setTimeout(() => {
        setExpandedOptn(false);
        setActiveIndex(null);
        setOrigin(null);

        // Refresh random for fan🎲🎲🎲
        randBtnSwing.current = btnsOptions.current.map(() => 10 + Math.random() * 100);
      }, 410);
    }

    prevPageRef.current = page;
  }, [page]);

  const handleClick = (index: number) => {
    const btn = btnRefs.current[index];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setOrigin({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      setActiveIndex(index);
    }
  };

  return (
    <>
      <div className={cssOptions.container}>
        {btnsOptions.current.map((opt, i) => {
          return (
            <React.Fragment key={opt.text}>
              <button
                ref={(item) => (btnRefs.current[i] = item)}
                onClick={() => opt.onClick(i)}
                className={cssOptions.exportBtn}
                style={{ animationDuration: `${randBtnSwing.current[i]}s` }}
              >
                {opt.text}
              </button>
              {i < btnsOptions.current.length - 1 && <div className={cssOptions.line}></div>}
            </React.Fragment>
          );
        })}

        <Btnback
          hndlr={() => {
            setExpandedOptn(false);
            setTimeout(() => {
              setActiveIndex(null);
            }, 300);
          }}
          isOnSetting={expandedOptn}
        />
        {activeIndex !== null && origin && (
          <section
            className={`${cssOptions.optionPage} ${expandedOptn ? cssOptions.optionPageOn : ''}`}
            style={{
              top: origin.top,
              left: origin.left,
              width: origin.width,
              height: origin.height,
            }}
          >
            {/*//* CSS All daughter edemnt here must use % for correct open-transition  */}
            {activeIndex === 0 && (
              <ImprtExprtList setPopupIsOpen={setPopupIsOpen} setPopupChild={setPopupChild} />
            )}

            {activeIndex === 1 && <div> {btnsOptions.current[activeIndex].text} </div>}
            {activeIndex === 2 && <div> {btnsOptions.current[activeIndex].text} </div>}
            {activeIndex === 3 && <div> {btnsOptions.current[activeIndex].text} </div>}
            {activeIndex === 4 && <div> {btnsOptions.current[activeIndex].text} </div>}
            {activeIndex === 5 && <div> {btnsOptions.current[activeIndex].text} </div>}
            {activeIndex === 6 && <div> {btnsOptions.current[activeIndex].text} </div>}
          </section>
        )}
      </div>
    </>
  );
}

import React from 'react';

import cssForkSettings from './ForkSettings.module.css';

type Props = { page: string; expandedOptn: boolean };

export default function ForkSettings({ page, expandedOptn }: Props) {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean[]>([false, false]);

  React.useEffect(() => {
    if (expandedOptn) setDrawerOpen([false, false]);
  }, [expandedOptn]);

  React.useEffect(() => {
    if (page !== 'settings' && (drawerOpen[0] || drawerOpen[1])) {
      setDrawerOpen([false, false]);
    }
  }, [page]);

  return (
    <>
      <section className={cssForkSettings.container}>
        <div
          onClick={() => {
            if (drawerOpen[0] || drawerOpen[1]) setDrawerOpen([false, false]);
          }}
          className={`${cssForkSettings.drawerBG} ${
            drawerOpen[0] || drawerOpen[1] ? '' : cssForkSettings.drawerBGOff
          }`}
        ></div>
        <button
          onClick={() => setDrawerOpen([!drawerOpen[0], drawerOpen[1]])}
          className={cssForkSettings.contacts}
        >
          Contacts
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${cssForkSettings.drawer}  ${drawerOpen[0] ? '' : cssForkSettings.drawerOff}`}
          >
            <div
              onClick={() => console.log('tg')}
              className={`${cssForkSettings.img} ${cssForkSettings.tg}`}
            ></div>
            <div className={`${cssForkSettings.img} ${cssForkSettings.gmail}`}></div>
            <div className={`${cssForkSettings.img} ${cssForkSettings.inst}`}></div>
          </div>
        </button>

        <div className={cssForkSettings.line}></div>
        <button className={cssForkSettings.donate} onClick={() => setDrawerOpen([drawerOpen[0], !drawerOpen[1]])}>
          Donate
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${cssForkSettings.drawer} ${drawerOpen[1] ? '' : cssForkSettings.drawerOff}`}
          >
            <div className={`${cssForkSettings.img} ${cssForkSettings.patreon}`}></div>
            <div className={`${cssForkSettings.img} ${cssForkSettings.kofi}`}></div>
            <div className={`${cssForkSettings.img} ${cssForkSettings.gpay}`}></div>
            <div className={`${cssForkSettings.img} ${cssForkSettings.paipal}`}></div>
          </div>
        </button>
      </section>
    </>
  );
}

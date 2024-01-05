'use client';

import React, { useState } from 'react';
import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import { getThemeSetting } from '../../services/theme';
import { defaultRobotsMeta } from '../../../config';
import DropdownComponent from '../../components/dropdown';
import containerStyles from '../../styles/components/container.module.scss';
import inputStyles from '../../styles/input.module.scss';

export default function Page(){

  const theme = getThemeSetting();

  const [selectedOption, setSelectedOption] = useState('');
  function onChange(event) {
    localStorage.setItem('theme', event.target.value);
    const body = document.body;
    body.setAttribute('data-theme', event.target.value);
    setSelectedOption(event.target.value);
  }

  return (
    <>
      <HeadMetaComponent
        slug="settings"
        robotsMeta={defaultRobotsMeta}
      />
      <CoverWithNavigationComponent
        contentCover={{
          title: "Settings",
          tags: null,
          publishedAt: null,
        }}
      />
      <main>
        <section className={`${containerStyles['container']}`}>
          <h2>Theme preferences</h2>
          <hr/>
          <form className={`${inputStyles['form']}`}>
            <DropdownComponent
              list={['light', 'dark']}
              defaultValue={theme}
              onChange={onChange}
            />
          </form>
        </section>
      </main>
    </>
  )
};

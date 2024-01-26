'use client';

import React, { useState } from 'react';
import { CoverWithNavigationComponent, DropdownComponent } from '../../components/components';
import { getTheme } from '../../services/theme';
import containerStyles from '../../styles/components/container.module.scss';

export default function Page(){

  const theme = getTheme();

  const [selectedOption, setSelectedOption] = useState('');
  function onChange(event) {
    localStorage.setItem('theme', event.target.value);
    const body = document.body;
    body.setAttribute('data-theme', event.target.value);
    setSelectedOption(event.target.value);
  }

  return (
    <>
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
          <form>
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

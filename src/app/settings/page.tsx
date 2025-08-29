"use client";

import { useState } from "react";
import { ActionButton } from "../../components/actionbutton";
import { CoverComponent, DropdownComponent } from "../../components/components";
import { getTheme } from "../../services/theme";
import buttonStyles from "../../styles/actionbutton.module.scss";
import containerStyles from "../../styles/components/container.module.scss";

export default function Page() {
  const theme = getTheme();

  const [selectedOption, setSelectedOption] = useState("");
  function onChange(event) {
    localStorage.setItem("theme", event.target.value);
    const body = document.body;
    body.setAttribute("data-theme", event.target.value);
    setSelectedOption(event.target.value);
  }

  function handleReset() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <CoverComponent
        props={{
          title: "Settings",
          tags: null,
          publishedAt: null
        }}
      />
      <main>
        <section className={`${containerStyles["container"]}`}>
          <h2>Theme preferences</h2>
          <hr />
          <form>
            <DropdownComponent
              options={["light", "dark"]}
              defaultValue={theme}
              onChange={onChange}
            />
          </form>

          <h2>Reset Settings</h2>
          <hr />
          <div className={`${buttonStyles["actionbutton-wrap"]}`}>
            <ActionButton title="Reset" onclick={handleReset} />
          </div>
        </section>
      </main>
    </>
  );
}

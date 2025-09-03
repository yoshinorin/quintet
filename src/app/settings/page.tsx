"use client";

import { useState } from "react";
import { ActionButton } from "../../components/actionbutton";
import { CoverComponent, DropdownComponent } from "../../components/components";
import { SYNTAX_PREVIEW_HTML } from "../../constants/syntaxPreview";
import {
  getSyntaxTheme,
  getTheme,
  setSyntaxTheme,
  setTheme
} from "../../services/theme";
import buttonStyles from "../../styles/actionbutton.module.scss";
import containerStyles from "../../styles/components/container.module.scss";

export default function Page() {
  const theme = getTheme();
  const syntaxTheme = getSyntaxTheme();

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSyntaxOption, setSelectedSyntaxOption] = useState("");

  function onChange(event) {
    const newTheme = event.target.value;
    setTheme(newTheme);
    setSelectedOption(newTheme);

    const currentSyntaxTheme = getSyntaxTheme();
    if (currentSyntaxTheme === "default") {
      setSyntaxTheme("default");
    }
  }

  function onSyntaxChange(event) {
    setSyntaxTheme(event.target.value);
    setSelectedSyntaxOption(event.target.value);
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

          <h2>Syntax Highlighting Theme</h2>
          <hr />
          <form>
            <DropdownComponent
              options={["default", "light", "dark"]}
              defaultValue={syntaxTheme}
              onChange={onSyntaxChange}
            />
          </form>

          <figure
            className="highlight scala"
            dangerouslySetInnerHTML={{ __html: SYNTAX_PREVIEW_HTML }}
          />

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

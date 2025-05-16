import { fetchSettings } from "../../API/settings";
import { SettingsType } from "../../utils/types";
import { useEffect, useState } from "react";
import SettingsForm from "./SettingsForm/Index";

function Settings() {
  const [settings, setSettings] = useState<SettingsType | undefined>(undefined);

  useEffect(() => {
    async function loadSettings() {
      const data = await fetchSettings();
      setSettings(data);
    }
    loadSettings();
  }, []);

  return (
    <main className="main__container">
      <section className="section">
        <div className="section__header">
          <h1 className="section__heading">Update hotel settings</h1>
        </div>
        <SettingsForm settings={settings} />
      </section>
    </main>
  );
}

export default Settings;

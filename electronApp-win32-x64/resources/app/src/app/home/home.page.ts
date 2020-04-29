import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { ElectronService } from "ngx-electron";
const { LocalNotifications, Clipboard, Modals } = Plugins;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  myText = "This is the Dummy text";
  constructor(private electronService: ElectronService) {
    if (this.electronService.isElectronApp) {
      console.log("Electron");
      this.electronService.ipcRenderer.on(
        "trigger-alert",
        this.showElectronAlert
      );
    }
  }

  async showElectronAlert() {
    Modals.alert({
      title: "Hello",
      message: "I am from your menu",
    });
  }

  async scheduleNotification() {
    LocalNotifications.schedule({
      notifications: [
        {
          title: "My Test notification",
          body: "My notification content",
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null,
        },
      ],
    });
  }
  async copyText() {
    Clipboard.write({
      string: this.myText,
    });
    Modals.alert({
      title: "OK",
      message: "Text copied to clipboard.",
    });
  }
}

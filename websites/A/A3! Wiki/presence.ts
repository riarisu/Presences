const presence = new Presence({
  clientId: "837305361639538728"
});

let title;
const browsingStamp = Math.floor(Date.now() / 1000);
const toURL = new URL(document.location.href);

presence.on("UpdateData", () => {

  const presenceData: PresenceData = {
    largeImageKey: "wiki"
  };
  presenceData.startTimestamp = browsingStamp;

  title = document.querySelector(".firstHeading");
  const action2Result = toURL.searchParams.get("action");
  const title2Result = toURL.searchParams.get("title");

  if (document.location.pathname == "/a3/index.php/Main_Page") {
    presenceData.details = "Viewing main page";
    presenceData.startTimestamp = browsingStamp;
  }

  if (title !== null) {
    presenceData.details = "Viewing page:";
    presenceData.state = title.textContent;
  }

  if (action2Result == "edit" && title2Result){
    presenceData.details = "Editing page:";
    if (title2Result.includes("_")) {
      presenceData.state = title2Result.replace(/_/g, " ");
    }
    else {
      presenceData.state = title2Result;
    }
    presenceData.startTimestamp = browsingStamp;
  }

  if (action2Result == "history" && title2Result){
    presenceData.details = "Viewing revision history of:";
    if (title2Result.includes("_")) {
      presenceData.state = title2Result.replace(/_/g, " ");
    }
    else {
      presenceData.state = title2Result;
    }
    presenceData.startTimestamp = browsingStamp;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  }
  else {
    presence.setActivity(presenceData);
  }
});

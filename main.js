// const fs = require('fs');

/*{
    "accessibilityLabel" : "Seals",
    "categories" : [
      "8BE8B524-6EAE-43F5-A3E8-01DCFA1BCD4B"
    ],
    "id" : "83C65C90-270C-4490-9C69-F51FE03D7F06",
    "pointsOfInterest" : {
      "0" : "A016_C009_0"
    },
    "shotID" : "SE_A016_C009",
    "url-4K-HDR" : "https:\/\/sylvan.apple.com\/Aerials\/2x\/Videos\/SE_A016_C009_HDR_20190717_HDR_4K_HEVC.mov",
    "url-4K-SDR" : "https:\/\/sylvan.apple.com\/Aerials\/2x\/Videos\/SE_A016_C009_SDR_20190717_SDR_4K_HEVC.mov",
    "url-1080-H264" : "https:\/\/sylvan.apple.com\/Videos\/SE_A016_C009_SDR_20190717_SDR_2K_AVC.mov",
    "url-1080-HDR" : "https:\/\/sylvan.apple.com\/Aerials\/2x\/Videos\/SE_A016_C009_HDR_20190717_HDR_2K_HEVC.mov",
    "url-1080-SDR" : "https:\/\/sylvan.apple.com\/Aerials\/2x\/Videos\/SE_A016_C009_SDR_20190717_SDR_2K_HEVC.mov"
},*/

var assets = [];
fetch('tvos15.json')
    .then(response => response.json())
    .then(jsonData => {
        console.log(jsonData);
        assets = jsonData["assets"];
        console.log(assets);
        assets.forEach(asset => {
            console.log(asset.accessibilityLabel);
        });
    })
    .then(() => {
        const randomUrl = assets[Math.floor(Math.random() * assets.length)];
        console.log(randomUrl);
        const videoElement = document.querySelector('video');
        if (videoElement) {
            const videoUrl = randomUrl["url-4K-SDR"];
            fetch(videoUrl)
                .then(response => response.blob())
                .then(blob => {
                    const videoBlobUrl = URL.createObjectURL(blob);
                    const webmVideoElement = document.createElement('video');
                    webmVideoElement.src = videoBlobUrl;
                    webmVideoElement.type = 'video/webm';
                    videoElement.src = webmVideoElement.src;
                })
                .catch(err => console.error('Error converting video to webm:', err));
        }
        const titleElement = document.querySelector('.title');
        if (titleElement) {
            titleElement.textContent = randomUrl["accessibilityLabel"];
        }
    })
    .catch(err => console.error(err));


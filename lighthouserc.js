module.exports = {
  "ci": {
    "upload": {
      "target": 'temporary-public-storage'
    },
    "collect": {
      "settings": {
        "chromeFlags": "--disable-gpu --no-sandbox"
      },
      "staticDistDir": './build'
    }
  }
}
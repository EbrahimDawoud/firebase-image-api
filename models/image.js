class Image {
  constructor(title, url, description) {
    this.title = title;
    this.url = url;
    this.description = description;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Image;

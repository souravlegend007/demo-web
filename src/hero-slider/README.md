# Hero Slider Image Manager

This folder manages the images and captions displayed in the **Hero Slider** on the school website homepage.

---

## 📁 Folder Structure

```
├── public/hero-slider/          <- Put your actual JPG/PNG image files here
│   ├── slide-1.jpg
│   ├── slide-2.jpg
│   ├── slide-3.jpg
│   └── ...
├── src/hero-slider/
│   ├── slidesData.ts           <- Edit slide titles, badges, and ordering here
│   ├── types.ts                <- Type definitions (HeroSlideItem)
│   ├── index.ts                <- Export helper functions
│   └── README.md               <- This guide
```

---

## 🛠️ How to Add or Change Images

### Step 1: Add your image file
Drop your image into the `public/hero-slider/` folder.
*Recommended image format: `.jpg` or `.png`, landscape orientation (16:9 ratio, approx 1920×1080 or 1200×675).*

### Step 2: Open `src/hero-slider/slidesData.ts`
Edit or add a new slide item in the `HERO_SLIDES` list:

```ts
{
  id: 'slide-9',
  title: 'Annual Day Celebrations 2026',
  category: 'Cultural Events',
  image: './hero-slider/my-new-photo.jpg',
  fallbackImage: 'https://...', // optional backup URL
  active: true,
  order: 9,
}
```

### How to Temporarily Hide a Slide
Simply change `active: false` inside `src/hero-slider/slidesData.ts`. The slide will not show in the carousel, but you won't lose your caption or image configuration!

### How to Change the Slide Order
Change the `order: 1`, `order: 2`, etc., numbers. The slider automatically orders from smallest to largest number.

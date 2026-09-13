# ARPS Agartala - Media Management Folder

This directory (`/src/media`) and its accompanying static asset folder (`/public/media`) serve as the central media manager for all photos and videos on the Assam Rifles Public School Agartala website.

## Directory Structure
```text
public/media/               # Place physical image & video files here
  photos/
    campus/                 # Campus buildings, gates, gardens, library
    events/                 # Annual day, science exhibitions, festivals
    sports/                 # Football, cricket, athletics, drill
    laboratories/           # Physics, Chemistry, Biology, Computer Labs
    ceremonial/             # Independence day, Republic day, Investiture
    ncc/                    # NCC Army wing parades, camp activities
  videos/                   # MP4/WebM video files or clip previews

src/media/                  # Media metadata & code registry
  index.ts                  # Main export & query helpers (getAllPhotos, searchMedia, etc.)
  mediaTypes.ts             # TypeScript interfaces for PhotoItem & VideoItem
  photosData.ts             # Photos catalog with categories, dates, captions & tags
  videosData.ts             # Videos catalog with video URLs, embeds, duration & previews
  README.md                 # Documentation (this file)
```

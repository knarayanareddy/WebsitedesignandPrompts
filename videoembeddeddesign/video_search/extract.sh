#!/bin/bash
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
urls="
https://www.pexels.com/video/a-person-snowboarding-downhill-6947516/
https://www.pexels.com/video/low-angle-view-of-a-man-snowboarding-6943040/
https://www.pexels.com/video/person-snowboarding-down-a-hill-5843724/
https://www.pexels.com/video/snowboarder-descending-pristine-snowy-slope-38713096/
https://www.pexels.com/video/snowboarding-on-slope-in-winter-11618451/
https://www.pexels.com/video/epic-snowboarding-adventure-in-pristine-winter-landscape-30754925/
https://www.pexels.com/video/woman-in-yellow-jacket-snowboarding-7166365/
https://www.pexels.com/video/a-person-is-snowboarding-down-a-snowy-slope-20179798/
https://www.pexels.com/video/a-woman-snowboarding-7165807/
https://www.pexels.com/video/snowboarder-riding-down-11270206/
https://www.pexels.com/video/close-up-of-snowboarder-6286881/
https://www.pexels.com/video/energetic-snowboard-jump-in-spring-sunshine-31934985/
"
for u in $urls; do
  html=$(curl -sL -A "$UA" "$u")
  title=$(echo "$html" | grep -oP '(?<=<meta property="og:title" content=")[^"]*' | head -1)
  dur=$(echo "$html" | grep -oP '"video_duration":"\K[0-9.]+' | head -1)
  # primary og:video
  vid=$(echo "$html" | grep -oP '(?<=<meta property="og:video" content=")[^"]*' | head -1)
  # all video file urls in JSON
  files=$(echo "$html" | grep -oP 'https://videos\.pexels\.com/video-files/[0-9]+/[0-9a-zA-Z_-]+\.mp4' | sort -u | tr '\n' ' | ')
  echo "URL: $u"
  echo "  TITLE: $title"
  echo "  DUR: ${dur}s"
  echo "  OGV: $vid"
  echo "  FILES: $files"
  echo ""
done

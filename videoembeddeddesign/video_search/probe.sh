#!/bin/bash
ids="6947516 6943040 5843724 38713096 11618451 30754925 7166365 20179798 7165807 11270206 6286881 31934985 6947537 6818701 6920668 6947512 31934986 38603313 6947508"
tiers="hd_1920_1080 hd_1280_720 sd_640_360"
fps_list="25fps 30fps 50fps 60fps 29.97fps 59.94fps 24fps"
for id in $ids; do
  found=""
  for tier in $tiers; do
    for fps in $fps_list; do
      url="https://videos.pexels.com/video-files/$id/$id-$tier-$fps.mp4"
      code=$(curl -s -o /dev/null -w "%{http_code}" -I "$url")
      if [ "$code" = "200" ]; then
        len=$(curl -sI "$url" | grep -i content-length | tr -dc '0-9')
        echo "$id $tier $fps $len $url"
        found=1
        break 2
      fi
    done
  done
  [ -z "$found" ] && echo "$id NOT_FOUND"
done

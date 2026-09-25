#!/bin/bash
probe_one() {
  url="$1"
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 -I "$url")
  if [ "$code" = "200" ]; then
    len=$(curl -sI "$url" --max-time 15 | grep -i content-length | tr -dc '0-9')
    echo "FOUND $len $url"
  fi
}
export -f probe_one
for id in 6947516 6943040 5843724 38713096 11618451 30754925 7166365 20179798 7165807 11270206 6286881 31934985 6947537 6818701 6920668 6947512 31934986 38603313 6947508; do
  for tier in sd_640_360 hd_1280_720 hd_1920_1080 uhd_2560_1440 uhd_3840_2160; do
    for fps in 24fps 25fps 29.97fps 30fps 50fps 59.94fps 60fps; do
      echo "https://videos.pexels.com/video-files/$id/$id-$tier-$fps.mp4"
    done
  done
done | xargs -P 12 -I{} bash -c 'probe_one "$@"' _ {} 2>/dev/null | tee probe2_results.txt

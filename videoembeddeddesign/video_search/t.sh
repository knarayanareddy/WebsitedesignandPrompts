probe_one() {
  url="$1"
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 -I "$url")
  if [ "$code" = "200" ]; then echo "FOUND $url"; else echo "MISS $code $url"; fi
}
export -f probe_one
printf '%s\n' "https://videos.pexels.com/video-files/6943040/6943040-uhd_2560_1440_30fps.mp4" "https://videos.pexels.com/video-files/6943040/6943040-hd_1920_1080_30fps.mp4" | xargs -P 4 -I{} bash -c 'probe_one "$@"' _ {}

// Файл создаётся скриптом scripts/build-images.mjs — не редактировать вручную.
// Крошечная подложка и список готовых ширин для lib/image-loader.ts и components/Img.

export type ImageEntry = {
  width: number
  height: number
  widths: number[]
  blur: string
}

export const imageManifest: Record<string, ImageEntry> = {
  "/images/before/before-0.jpg": {
    "width": 1800,
    "height": 1006,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAABwAwCdASoUAAsAPxFyslAsJqSisAgBgCIJaQAASAJ/8Mlh9AAA/bI63rP80GUG8oYv5xzGylbK1j/Q+KUOdEHjVuWKwAAA"
  },
  "/images/before/before-1.jpg": {
    "width": 1800,
    "height": 2700,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAwBACdASoUAB4APwFkq1ArJSQit/qoAWAgCWUAuwAPfWEyA9swHb862IAAwrfvIUdOUn9ugZ71KMBwyUMC72Tt69L8HZAQ6ym2yVffo5hjYQIY4KlyDeDWYz20UORgAAA="
  },
  "/images/hero/main.jpg": {
    "width": 1800,
    "height": 1174,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACQAwCdASoUAA0APxF0slCsJqSisAgBgCIJQBibDSv63YwHoM8AAP77pQRQOahQt7Q2iR4xRpI6aPVxfHb0LVCAAAA="
  },
  "/images/home/concept.jpg": {
    "width": 1800,
    "height": 2793,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADwAwCdASoUAB8APwFirFArJSQit/qoAWAgCWUAx+QYMIhJhVCtbGMAAPxXBGytw5OPagjVPW1VpaBib2YWQ90fNEstY0AVcJNhOtqevlAAAA=="
  },
  "/images/home/contact-texture.jpg": {
    "width": 1800,
    "height": 1350,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADwAgCdASoUAA8APxFysFC4pqSisAgDECIJZQCw7C5JAAD+4ZlTn94U49+ZOgMuwAA="
  },
  "/images/home/feature.jpg": {
    "width": 1800,
    "height": 3200,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAABQBQCdASoUACQAPwlkrFArpSQitVv4AXAhCWcA0nAhXt554cEnQI9hf8QPFa2cOkx4oqAA/up2zks/crs/A+TL/stZ/O1x+1ZNO/iPzHEJ9a94r/BTXhYghAYAAAAA"
  },
  "/images/home/intro.jpg": {
    "width": 1800,
    "height": 2700,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAACQBACdASoUAB4APxF2slEsJySisAgBgCIJZwCw7B7G4XBo1932fEWn8uE2YSgA/p3MR5A/VJepcAFRdh/g1oosIJS9DDFg+ZfYAC1jZLdXr8TBMbAC+1oJsZl0+1pZMAA="
  },
  "/images/home/light.jpg": {
    "width": 1800,
    "height": 1770,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAAAQBACdASoUABQAPxF0tFEsJqUiqA1RgCIJaQAAKZ6/DP1aT+sIgLUgAAD1ZDKgYpqRWlutkmPHH4iwAszJ951gLFgAa+JnSiRHEbENtoxNEgAA"
  },
  "/images/home/testimonial.jpg": {
    "width": 1800,
    "height": 2700,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAQBQCdASoUAB4APw1srlAsJaQit/VYAYAhiWUAvzgztpWsEPUe/wFb+SX8QzAp8PIAAPxsXK9/ME5ppduXMNZ5rtu6BaeIN1X9cjJlpWGt1XpzWJokuyGWwEqrfguIrjxb23iCHQQh1kAAAAA="
  },
  "/images/materials/clay.jpg": {
    "width": 1800,
    "height": 1006,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAACwAwCdASoUAAsAPxF0sFCsJqSisAgBgCIJYgDE2B6OHFxsdG4YiAD+wj1Gk8k7/Dm5emTWKWo6A5P6mm9FdwxwM+LVSoANRNE7cuIYAAA="
  },
  "/images/materials/concrete.jpg": {
    "width": 1800,
    "height": 1200,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAwCdASoUAA0APxF0sVAsJySisAgBgCIJaQAATvv5L/6d902aBAAA/q7qMMexx8UD/lx0AAAAAA=="
  },
  "/images/materials/fabric.jpg": {
    "width": 1800,
    "height": 2873,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAgCdASoUACAAPxGAt1Wwp6UpKAgCECIJQBjegtW3GAD+7M+U4eRYKrJz/RGH+CN4iGwBC4Evq/AAAAA="
  },
  "/images/materials/facade.jpg": {
    "width": 1800,
    "height": 2400,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAABwBACdASoUABsAPxF2sFAsJ6SisAgBgCIJaQAAW+5oh3eKl+gW0cMMfCkAAAD+34RGhMpCxkNN/N4aU855OuMKkVw9OUCYsxDJxxk5RJjY0Du4VcUoPIzOX0LIyipHyddTQ9FsPkGoAAAA"
  },
  "/images/materials/linen.jpg": {
    "width": 1800,
    "height": 2400,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAQBQCdASoUABsAPxF2slGsJySisBgIAYAiCWUArhwNz6NXW4W9RsGI/r4gYhLTQNAAAP7Fd9EhoEvujzNujmV3UjXG2g+HT6w8fi0CBlAbyX2oFnYDzj9pykH+l+rIk7mmQVK2wW0AAA=="
  },
  "/images/materials/plaster.jpg": {
    "width": 1800,
    "height": 1350,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADwAgCdASoUAA8APxFysFC4pqSisAgDECIJZQCw7C5JAAD+4ZlTn94U49+ZOgMuwAA="
  },
  "/images/materials/stone.jpg": {
    "width": 1800,
    "height": 2700,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAQBQCdASoUAB4APxF0s1IsJqSisBgIAYAiCWcAACnIZNoMbfCQ7wor+vUx3XyKIJLAAPnriN3qZXow8na9SAFekdgUdUx4/m5vU9SEpeXmd2EOnDxgnUGQit1IzP4xCAiUAAAA"
  },
  "/images/process/desk.jpg": {
    "width": 1800,
    "height": 2395,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAACwBACdASoUABsAPxFwrVEsJiQisBgMAYAiCWkAACMahRwlFOH/1Zivu9s1K20AAO+K8gSWxN07NTDT4vv4W0WHjKq1U5SCuwJXfzINQFLWWoqP7/gHkSA3+aAAAA=="
  },
  "/images/process/draft.jpg": {
    "width": 1800,
    "height": 1200,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACwAwCdASoUAA0APxFysFCsJqSisAgBgCIJZQDE2B06+5+x9WDNwAD9+Czi9X5OluvthpmA9Q1qyo0UvSA+l7yAAAA="
  },
  "/images/process/plan.jpg": {
    "width": 1800,
    "height": 1013,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAABQAwCdASoUAAsAPxFysFAsJqSisAgBgCIJZwAAPpWvZl4oAAD+xs+yBJ5hke6d6lsGN6bCWFbGbjiAd5Ab8lfosrrF734xQAA="
  },
  "/images/projects/apartment/cover.jpg": {
    "width": 1800,
    "height": 1200,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAABwAwCdASoUAA0APxFysVAsJqSisAgBgCIJZQCdAApqNQ3rdMgA/ow2oxYDhkBnPvW9TBFWVyUgodlGeyqs7OTTAth4AA=="
  },
  "/images/projects/apartment/gallery-1.jpg": {
    "width": 1800,
    "height": 1013,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACQAwCdASoUAAsAPxFysVAsJqSisAgBgCIJZQDCgCHU4JpKorwAAP7nEzA+UOynp/XvjsrADjGOiAdivAA="
  },
  "/images/projects/apartment/gallery-2.jpg": {
    "width": 1800,
    "height": 1200,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAACwAwCdASoUAA0APxFysFAsJqSisAgBgCIJQBadBDuYijfcnQmMQAD+Yo+KxJsD4LNehGl+zr60JE/1ncmzy/RntEIaoHGqtdtK6QPQAAA="
  },
  "/images/projects/apartment/gallery-3.jpg": {
    "width": 1800,
    "height": 1201,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACwAwCdASoUAA0APxFysFAsJqSisAgBgCIJZQCdAB60o9vJWm9igAD+Z0F0I+/PlX28RMeqhEepgLLif6W3VKXXFaiNgut/rSp+carrCmgHQAAA"
  },
  "/images/projects/apartment/gallery-4.jpg": {
    "width": 1800,
    "height": 2700,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADwBACdASoUAB4APvVmqFAqpaQit+gBUB6JZQDDrDVlRCfBf+ajBlMGabbvyhfZkWgA/NI6TcDAjtPLJdgTY5zxdfXJstvno5VDRE0QQLexRnY3BFN0hFMVYGqwm8H642CvUQn34AA="
  },
  "/images/projects/apartment/gallery-5.jpg": {
    "width": 1800,
    "height": 2700,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAABQBACdASoUAB4APxFys1MsJiSisBgIAYAiCWcAyRAINVwjZZAnzrOQ4CBQAP6ZpqXj/90Zp32Jq1okD9kuGNf1vIjI8st5F5xpxWsGeIPVCBjRdr/RP+fJvi+yQIAA"
  },
  "/images/projects/house/cover.jpg": {
    "width": 1800,
    "height": 1200,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAAAQBACdASoUAA0APxFwsFAsJiSisAgBgCIJaACw/f/gMW3todwObQBjgAD+atbXXHV/m/NGlK+E6AqR2TkmZctxOMQtF5gv4scu/bN1uZ5/JZ06bJyTk5XWYheVw5JIjDOsAA=="
  },
  "/images/projects/house/gallery-1.jpg": {
    "width": 1800,
    "height": 1200,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACwAwCdASoUAA0APxFysVAsJqSisAgBgCIJQBOgA4U5sdz+mSy0AAD7GDY6KDmALIvFfJTCsXWyRlQsyL1htqZwsAdduWlJgUkfDeNhshr6LAAA"
  },
  "/images/projects/house/gallery-2.jpg": {
    "width": 1800,
    "height": 1200,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAACQAwCdASoUAA0APxFysFCsJqSisAgBgCIJZACdAB2Z+OltZvaAAPihBduDkd+XESrZE7g8atwbWWGBfrYSmJ8po/+TpnbG+3fc2KlYfXgkt3cPnCX5oAAA"
  },
  "/images/projects/house/gallery-3.jpg": {
    "width": 1800,
    "height": 2700,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAQBQCdASoUAB4APxFus1AsJiUisBgMAYAiCWMAAPBh2a7ES3A0R9gJMusEP1edHXxgAP6M+67RP560+uyyByl7DcMMIGNcl3cSAmJFAfh/oyTVI/1fWCqJXZlJv1CAAAA="
  },
  "/images/projects/house/gallery-4.jpg": {
    "width": 1800,
    "height": 1201,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACQAwCdASoUAA0APxFwsFAsJiSisAgBgCIJYwCw7Avsc0JdeAhAAPoA74h15v2+EOocgml8EA3pvdMX0kPGXRiVlZb/LfiCpFWbDhdYtPJ+yOQ/vbwAAA=="
  },
  "/images/projects/house/gallery-5.jpg": {
    "width": 1800,
    "height": 1201,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACQAwCdASoUAA0APxF0tFEsJqUisAgBgCIJZQDE2BcEmm7p+4KAAMqyPQnxrPUJKqpIZNot9cy76ov+/blRPC+JwoY2VTBC2NFAdXH1kN0CsIAA"
  },
  "/images/studio/materials.jpg": {
    "width": 1800,
    "height": 2700,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAwBQCdASoUAB4APw1srlAsJaQit/VYAYAhiWcAzfwKoeVXMa9O2v8nLwuP/6rTXlhBAAD+xyrxiUuOFujI751fAMqAzs/k+UYoqERe2K2y7G9T98Q9Oa5nzRp6pCwPe6GLDY+yl3ZiYzysiHi3xXpfYzN06dmAAAA="
  },
  "/images/studio/review.jpg": {
    "width": 1800,
    "height": 2700,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAABQBQCdASoUAB4APxF2sVAsJ6SisAgBgCIJYgCdM5HzGDwgFHtqnOeHHLZ+SHx/kck6fjQA9yeKFh4gzOpO5HAqTyekFn0fAkrgEJ2nUi+SRoQtNmqjVC8wWIorol8Uc06r57PP9CCRpYBEscdM9O5N8OK04UadCUpZtQ7fGZy8TBkHVwuS8eMAQDk3vmJIBT/aRr0QIPGTgxBtPpvWAZ+kAAA="
  },
  "/images/studio/space.jpg": {
    "width": 1800,
    "height": 2696,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAACwBACdASoUAB4APxF8s1QsJ6QjKAqpgCIJZwDO7DTvrga0yNYBmgp3RDeseoAAAP7nF1EYjQgYvTL6/n7TVgzomhcesD6jwX55bIkZ9mlHBbt8x9x3HbeNUnlOAKYmr0rfHZ6Ndv3ji9MsmTBisp7Sh4+gAAAA"
  },
  "/images/studio/team.jpg": {
    "width": 1800,
    "height": 1200,
    "widths": [
      320,
      400,
      640,
      828,
      1080,
      1280,
      1600
    ],
    "blur": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADQAwCdASoUAA0APxFysVCsJqSisAgBgCIJQBdgA21DvfU8LLpjX8AA/Naqmmb7sR7xenz1whCI+Gehi/aVusHF9NKUnf3vhYoRIOi+dNGUPRar9WknEHESVQAAAA=="
  }
}

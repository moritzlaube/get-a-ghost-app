<template>
  <svg
    width="44"
    height="55"
    viewBox="0 0 44 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="ghost">
      <path
        id="left-pupil"
        d="M27.1271 13.2461C26.1384 13.2461 25.3383 14.2117 25.3383 15.4028C25.3383 16.5939 26.1384 17.561 27.1271 17.561C28.1158 17.561 28.9149 16.596 28.9149 15.4028C28.9149 14.2097 28.1158 13.2461 27.1271 13.2461Z"
        fill="white"
      />
      <path
        id="body"
        d="M27.4833 0.771851C18.4571 0.771851 11.1381 9.52624 11.1381 20.3235C11.1381 30.5181 11.1753 38.6206 1.14918 52.105C0.980891 52.332 0.87983 52.6022 0.857643 52.8845C0.835455 53.1668 0.893045 53.4496 1.02377 53.7004C1.1545 53.9511 1.35305 54.1596 1.59651 54.3019C1.83998 54.4441 2.11846 54.5142 2.39983 54.5041C37.0712 53.2269 43.8336 30.8133 43.8336 20.3235C43.831 9.52624 36.5131 0.771851 27.4833 0.771851ZM26.4197 20.8955C24.243 20.8955 22.4812 19.3743 22.4812 15.8897C22.4812 12.4051 24.243 10.1751 26.4197 10.1751C28.5964 10.1751 30.3582 12.4046 30.3582 15.8897C30.3582 19.3749 28.5938 20.8955 26.4197 20.8955ZM36.033 20.8955C33.8589 20.8955 32.0945 19.3743 32.0945 15.8897C32.0945 12.4051 33.8589 10.1751 36.033 10.1751C38.2072 10.1751 39.9715 12.4046 39.9715 15.8897C39.9715 19.3749 38.2118 20.8955 36.033 20.8955Z"
        fill="#ED408D"
      />
      <path
        id="right-pupil"
        d="M35.3252 13.2461C34.3365 13.2461 33.5374 14.2117 33.5374 15.4028C33.5374 16.5939 34.337 17.561 35.3252 17.561C36.3134 17.561 37.114 16.596 37.114 15.4028C37.114 14.2097 36.3139 13.2461 35.3252 13.2461Z"
        fill="white"
      />
      <path
        id="left-lid"
        d="M31 15.1905C31 18.6094 29.125 22 26.625 22C24.125 22 21 20.7619 21 15.1905C21 11.7716 22.875 9 26.625 9C29.125 9 31 11.7716 31 15.1905Z"
        fill="#ED408D"
      />
      <path
        id="right-lid"
        d="M41 15.1905C41 19.5238 39.125 22 36.625 22C34.125 22 31 20.7619 31 15.1905C31 11.7716 32.875 9 36.625 9C39.125 9 41 10.8571 41 15.1905Z"
        fill="#ED408D"
      />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
svg {
  overflow: visible;
  max-width: 24rem;
  display: block;
  margin: 0 auto;
}

#ghost {
  animation: hover 1s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite
    alternate-reverse;
}

#left-lid,
#right-lid {
  transform: scaleY(0);
  transform-origin: 100% 15%;
  animation: blink 3s cubic-bezier(0.95, 0.05, 0.795, 0.035) infinite alternate;
}

@keyframes blink {
  0%,
  80% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}

@keyframes hover {
  0% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(2px);
  }
}
</style>

const WATER_FROW = class {
  constructor(pin) {
    /* コンストラクタ */
    this.pin = pin;
  }

  async result(flag) {
    const gpioAccess = await navigator.requestGPIOAccess(); // GPIO を操作する
    const flowPort = gpioAccess.ports.get(this.pin);

    await flowPort.export("in");

    var time_new = new Date();
    time_new.setSeconds(time_new.setSeconds + 10);

    var rate_cnt = 0;
    var cnt = 0;
    var State = 0;
    var f = 0;

    while (new Date() <= time_new) {
      const flg = await flowPort.read();
      if (flg === 1 && State === 0) {
        rate_cnt += 1;
        State = 1;
      } else if (flg === 0 && State === 1) {
        State = 0;
      }
      cnt += 1;
    }

    if (flag === 1) {
      f = rate_cnt * 0.0133;
    } else if (flag === 2) {
      f = rate_cnt * 0.0157;
    }

    return { f, rate_cnt, cnt };
  }
};

const PIN = 12;
const FLAG = 1;

var frow = WATER_FROW(PIN);
console.log(frow.result(FLAG));

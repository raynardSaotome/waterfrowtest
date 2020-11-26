const WATER_FROW = class {
  constructor(pin) {
    /* コンストラクタ */
    this.pin = pin;
  }

  async result(flag) {
    const gpioAccess = await navigator.requestGPIOAccess(); // GPIO を操作する
    const flowPort = gpioAccess.ports.get(this.pin);

    await flowPort.export("in");

    const time_new = new Date();
    time_new.setSeconds(time_new.getSeconds() + 10);

    var rate_cnt = 0;
    var cnt = 0;
    var State = 0;
    var f = 0;

    while (new Date().getTime() <= time_new.getTime()) {
      const readgpio = await flowPort.read();
      const lit = readgpio === 0;
      const flg = await (lit ? 1 : 0);
      //      const flg = 1;
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

    console.log(f);
    console.log(rate_cnt);
    console.log(cnt);
  }
};

const PIN = 18; // same samples port
//for test
//const PIN = 5;
const FLAG = 1;

var frow = new WATER_FROW(PIN);
frow.result(FLAG);

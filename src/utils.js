import isPromise from "is-promise";

export const toMobileNumber = phoneNumber =>
  `${phoneNumber.prefix} ${phoneNumber.number}`;

export const toAddress = address => [
  address.addressLines.street,
  address.addressLines.city,
  address.addressLines.zip,
  address.country
];

export const toPlayerSettingsData = data => {
  if (!data) {
    return {};
  }
  return {
    fullName: `${data.contactInfo.name.firstName} ${
      data.contactInfo.name.lastName
    }`,
    email: data.contactInfo.email,
    mobileNumber: toMobileNumber(data.contactInfo.phoneNumber),
    address: toAddress(data.contactInfo.primaryAddress),
    offersByEmail: true
  };
};

export const toPlayerConfigurationData = ({ configuration = {} } = {}) =>
  configuration;

export const sleep = ms => data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, ms);
  });
};

export const bridgeFactory = () => {
  const obj = {};
  return {
    on: (ev, cb) => {
      if (!obj[ev]) {
        obj[ev] = [];
      }

      obj[ev].push(cb);
    },
    emit: (ev, data) => {
      console.log("🌈 Emitting event", { ev, data });

      if (obj[ev]) {
        obj[ev].forEach(listener => {
          listener(data);
        });
      }
    }
  };
};

export const cacheLocallyForMs = ms => {
  let lastUpdated = 0;
  let lastValue;
  console.log(`🏝 Setting up local cache for ${ms}ms`);

  return performCall => (...args) => {
    const now = new Date().getTime();
    console.log(`🏝 Last updated: ${lastUpdated}, now: ${now}`);
    if (now - lastUpdated <= ms) {
      console.log(
        `🏝 Still ${ms - (now - lastUpdated)}ms before the cache expires.`,
        { lastValue }
      );
      return Promise.resolve(lastValue);
    }

    console.log(`🏝 Returning a promise to perform work`);
    return new Promise(resolve => {
      console.log(`🏝 Performing work`);
      return resolve(performCall(...args));
    })
      .then(value => {
        lastValue = value;
        lastUpdated = new Date().getTime();
        console.log(`🏝 Work performed updating internal values`, {
          lastValue,
          lastUpdated
        });

        return value;
      })
      .catch(console.error);
  };
};

const commonFetch = (url, options) => {
  return fetch("/api-gw/api/" + url, {
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    },
    ...options
  }).then(x => x.json());
};

export const usingPOST = (url, options) =>
  commonFetch(url, {
    method: "POST",
    ...options
  });

export const usingGET = commonFetch;

export const mockWith = mockFn => actualFn => (...args) => mockFn(...args);

export const once = fn => {
  let run = false;
  let lastValue;
  return (...args) => {
    if (!run) {
      run = true;
      lastValue = fn(...args);
    } else {
    }
    return lastValue;
  };
};

export const compose2 = (f, g) => (...args) => f(g(...args));
export const property = k => obj => obj[k];

export const rejectIfNotPromise = fn => a =>
  isPromise(a) ? fn(a) : Promise.reject(new TypeError("Expected promise"));

export const trace = x => {
  console.log(x);
  return x;
};

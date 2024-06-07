class HashMap {
  constructor(initialCapacity = 8) {
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      const [existingKey] = bucket[i];
      if (existingKey === key) {
        bucket[i] = [key, value];
        return;
      }
    }
    bucket.push([key, value]);
    this.size++;

    if (this.size / this.buckets.length > 0.7) {
      this.resize(this.buckets.length * 2);
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, value] = bucket[i];
      if (existingKey === key) {
        return value;
      }
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      const [existingKey] = bucket[i];
      if (existingKey === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      const [existingKey] = bucket[i];
      if (existingKey === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keysArray = [];
    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        keysArray.push(key);
      }
    }
    return keysArray;
  }

  values() {
    const valuesArray = [];
    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        valuesArray.push(value);
      }
    }
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        entriesArray.push([key, value]);
      }
    }
    return entriesArray;
  }

  resize(newCapacity) {
    const oldBuckets = this.buckets;
    this.buckets = new Array(newCapacity).fill(null).map(() => []);
    this.size = 0;
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}

class HashSet {
  constructor(initialCapacity = 8) {
    this.map = new HashMap(initialCapacity);
  }

  add(key) {
    this.map.set(key, true);
  }

  has(key) {
    return this.map.has(key);
  }

  remove(key) {
    return this.map.remove(key);
  }

  size() {
    return this.map.length();
  }

  clear() {
    this.map.clear();
  }

  keys() {
    return this.map.keys();
  }
}

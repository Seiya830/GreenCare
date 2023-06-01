<template>
  <div class="main-content">
    <img alt="植物の画像" />
    <h2>植物名: カクチペス</h2>
    <p>前回の水やり: {{ lastWateredDate }}</p>
    <p>前回のメモ:</p>
    <button @click="updateLastWateredDate">水やり完了</button>
    <br />
    <button @click="toggleMemoInput">メモ追加</button>
    <div v-if="showMemoInput">
      <textarea rows="4" cols="50"></textarea>
      <button>保存</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMemoInput: false,
      lastWateredDate: "",
    };
  },
  methods: {
    toggleMemoInput() {
      this.showMemoInput = !this.showMemoInput;
    },
    updateLastWateredDate() {
      const currentDate = new Date();
      this.lastWateredDate = currentDate.toLocaleDateString();

      fetch("/api/updateLastWateredDate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lastWateredDate: this.lastWateredDate }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss">
.main-content {
  margin-top: 100px;
  margin-right: 30px;
  margin-left: 30px;
  text-align: center;
  border: 1px solid;

  img {
    border: 1px solid;
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: 300px;
  }

  h2 {
    margin-top: 20px;
    font-size: 24px;
    color: #333;
  }

  p {
    margin-top: 10px;
    color: #777;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>

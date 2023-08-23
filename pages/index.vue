<template>
  <div class="container">
    <h1>GreenCare</h1>

    <!-- PlantsModal -->
    <div
      class="modal fade plants-modal"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Plant</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input
              v-model="editedPlant.name"
              type="text"
              class="form-control"
              id="exampleInputName1"
              aria-describedby="nameHelp"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="editPlant(editedPlant)"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="error"
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <strong>Error:</strong> Delete Error
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="error = null"
      ></button>
    </div>

    <form>
      <div class="mb-3">
        <label for="exampleInputName1" class="form-label">Name</label>
        <input
          v-model="plant"
          type="text"
          class="form-control"
          id="exampleInputName1"
          aria-describedby="nameHelp"
        />
      </div>
      <button
        type="submit"
        class="btn btn-success"
        @click.prevent="addPlant(plant)"
      >
        Add Name
      </button>
    </form>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">水やり</th>
          <th scope="col">前回の水やり日</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(plant, index) in plants">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ plant.name }}</td>
          <td>
            <button
              type="button"
              class="btn btn-info btn-sm"
              @click="markAsWatered(plant)"
            >
              Done
            </button>
          </td>
          <td>
            <p v-if="plant.lastWatered_at">
              {{ new Date(plant.lastWatered_at).toLocaleDateString() }}
            </p>
            <p v-else></p>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-warning btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="
                {
                  editedPlant.id = plant.id;
                  editedPlant.name = plant.name;
                }
              "
            >
              Edit
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="deletePlant(plant.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- MemosModal -->
    <div
      class="modal fade"
      id="exampleModal2"
      tabindex="-1"
      aria-labelledby="exampleModalLabel2"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel2">Edit Memo</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input
              v-model="editedMemo.content"
              type="text"
              class="form-control"
              id="exampleInputContent1"
              aria-describedby="contentHelp"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="editMemo(editedMemo)"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <form>
      <div class="mb-3">
        <label for="exampleInputMemo1" class="form-label">Memo</label>
        <textarea
          v-model="memo"
          type="text"
          class="form-control"
          id="exampleInputMemo1"
          aria-describedby="memoHelp"
        />
      </div>
      <button
        type="submit"
        class="btn btn-success"
        @click.prevent="addMemo(memo)"
      >
        Add Memo
      </button>
    </form>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Content</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(memo, index) in memos">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ memo.content }}</td>
          <td>
            <button
              type="button"
              class="btn btn-warning btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
              @click="
                {
                  editedMemo.id = memo.id;
                  editedMemo.content = memo.content;
                }
              "
            >
              Edit
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="deleteMemo(memo.id)"
            >
              Delete
            </button>
          </td>
          <td>{{ memo.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { H3Error } from "h3";
const plants = ref(null);
const plant = ref(null);
const error = ref(null);
const editedPlant = ref({
  id: null,
  name: null,
});

const memos = ref(null);
const memo = ref(null);
const editedMemo = ref({
  id: null,
  content: null,
});

plants.value = await getPlants();
memos.value = await getMemos();

// Get plants
async function getPlants() {
  return await $fetch("/api/plants");
}

// Add plant
async function addPlant(plant) {
  let addedPlant = null;
  if (plant)
    addedPlant = await $fetch("/api/plants", {
      method: "POST",
      body: {
        name: plant,
      },
    });

  if (addedPlant) plants.value = await getPlants();
}

// Edit plant
async function editPlant(editedPlant) {
  let plant = null;

  if (editedPlant.id && editedPlant.name)
    plant = await $fetch("/api/plants", {
      method: "PUT",
      body: {
        id: editedPlant.id,
        name: editedPlant.name,
      },
    });

  if (plant) plants.value = await getPlants();
}

// Delete plant
async function deletePlant(id) {
  let deletePlantOrError = null;
  if (id)
    deletePlantOrError = await $fetch("/api/plants", {
      method: "DELETE",
      body: {
        id: id,
      },
    });

  if (deletePlantOrError instanceof H3Error) {
    error.value = deletePlantOrError;
    return;
  }

  plants.value = await getPlants();
}

// Get memos
async function getMemos() {
  const fetchedMemos = await $fetch("/api/memos");
  return fetchedMemos.map((memo) => ({
    ...memo,
    date: new Date(memo.created_at).toLocaleDateString(),
  }));
}

// Add memos
async function addMemo(memo) {
  let addedMemo = null;
  if (memo)
    addedMemo = await $fetch("/api/memos", {
      method: "POST",
      body: {
        content: memo,
      },
    });

  if (addedMemo) memos.value = await getMemos();
}

// Edit memo
async function editMemo(editedMemo) {
  let memo = null;

  if (editedMemo.id && editedMemo.content)
    memo = await $fetch("/api/memos", {
      method: "PUT",
      body: {
        id: editedMemo.id,
        content: editedMemo.content,
      },
    });

  if (memo) memos.value = await getMemos();
}

// Delete memo
async function deleteMemo(id) {
  let deleteMemoOrError = null;
  if (id)
    deleteMemoOrError = await $fetch("/api/memos", {
      method: "DELETE",
      body: {
        id: id,
      },
    });

  if (deleteMemoOrError instanceof H3Error) {
    error.value = deleteMemoOrError;
    return;
  }

  memos.value = await getMemos();
}

async function markAsWatered(plant) {
  const now = new Date().toISOString();
  const updatedPlant = await $fetch("/api/plants", {
    method: "PUT",
    body: {
      id: plant.id,
      name: plant.name,
      lastWatered_at: now,
    },
  });

  if (updatedPlant) {
    plants.value = await getPlants();
  }
}

useHead({
  title: "Green Care",
  link: {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    type: "text/css",
  },
  script: {
    src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
  },
});
</script>
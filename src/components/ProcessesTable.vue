<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { ref, watch } from "vue";

type Person = {
  name: string;
  title: string;
  email: string;
  role: string;
};

const people: Person[] = [
  {
    name: "Contratar fulano",
    title: "Pendente",
    email: "aqui vai alguma informação",
    role: "aqui vai outra",
  },
];

const checkbox = ref<HTMLInputElement | null>(null);
const checked = ref(false);
const indeterminate = ref(false);
const selectedPeople = ref<Person[]>([]);

watch(selectedPeople, () => {
  const isIndeterminate =
    selectedPeople.value.length > 0 &&
    selectedPeople.value.length < people.length;
  checked.value = selectedPeople.value.length === people.length;
  indeterminate.value = isIndeterminate;
  if (checkbox.value) {
    checkbox.value.indeterminate = isIndeterminate;
  }
});

function toggleAll() {
  selectedPeople.value =
    checked.value || indeterminate.value ? [] : [...people];
  checked.value = !checked.value && !indeterminate.value;
  indeterminate.value = false;
}

function togglePerson(person: Person) {
  if (selectedPeople.value.includes(person)) {
    selectedPeople.value = selectedPeople.value.filter((p) => p !== person);
  } else {
    selectedPeople.value.push(person);
  }
}

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}
</script>

<template>
    <div data-testid="flow" class="py-4 sm:px-6 lg:px-8 bg-white rounded-lg border-2 border-neutral-300">
        <div class="mt-4 sm:mt-0 sm:flex-none">
          <button
          type="button"
          class=" flex gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600/"
          >
          <Plus :size="24"/>
          Novo
          </button>
        </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="relative">
              <div v-if="selectedPeople.length > 0" class="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                <button
                  type="button"
                  class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                >
                  Editar
                </button>
                <button
                  type="button"
                  class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                >
                  Excluir
                </button>
              </div>
              <table class="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        ref="checkbox"
                        :checked="checked"
                        @change="toggleAll"
                      />
                    </th>
                    <th scope="col" class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">Nome</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Alguma coisa</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Outra coisa n sei</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                      <span class="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                    v-for="person in people"
                    :key="person.email"
                    :class="{ 'bg-gray-50': selectedPeople.includes(person) }"
                  >
                    <td class="relative px-7 sm:w-12 sm:px-6">
                      <div v-if="selectedPeople.includes(person)" class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"></div>
                      <input
                        type="checkbox"
                        class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        :value="person.email"
                        :checked="selectedPeople.includes(person)"
                        @change="togglePerson(person)"
                      />
                    </td>
                    <td
                      :class="classNames('whitespace-nowrap py-4 pr-3 text-sm font-medium', { 'text-indigo-600': selectedPeople.includes(person), 'text-gray-900': !selectedPeople.includes(person) })"
                    >
                      {{ person.name }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.title }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.email }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.role }}</td>
                    <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, {{ person.name }}</span></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

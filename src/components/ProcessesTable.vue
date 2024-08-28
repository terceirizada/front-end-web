<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { GetProcessesService } from "../api/domain/services/get-processes-service";
import { APIRequest } from "../types/api";
import Process from "../api/domain/models/process";

const getProcesses = async (): Promise<Array<Process>> => {
  const getProcessesService = new GetProcessesService();
  const services: APIRequest<Array<Process>> = await getProcessesService.execute();
  return services.data.data;
};

const processes = ref<Array<Process>>([]);

onMounted(async () => {
  try {
    const allProcesses = await getProcesses()
    
    processes.value = allProcesses.map(
      (process) =>
        new Process(
          process.getId(),
          process.getResponsavel(),
          process.getCandidato(),
          process.getCargo(),
          process.getStatus()
        )
    );
  } catch (error) {
    if (error instanceof Error) 
    alert(error.message);
  }
});

const checkbox = ref<HTMLInputElement | null>(null);
const checked = ref(false);
const indeterminate = ref(false);
const selectedProcess = ref<Array<Process>>([]);

watch(selectedProcess, () => {
  const isIndeterminate =
    selectedProcess.value.length > 0 &&
    selectedProcess.value.length < processes.value.length;
  checked.value = selectedProcess.value.length === processes.value.length;
  indeterminate.value = isIndeterminate;
  if (checkbox.value) {
    checkbox.value.indeterminate = isIndeterminate;
  }
});

function toggleAll() {
  selectedProcess.value =
    checked.value || indeterminate.value ? [] : [...processes.value];
  checked.value = !checked.value && !indeterminate.value;
  indeterminate.value = false;
}

function toggleprocess(process: Process) {
  if (selectedProcess.value.includes(process)) {
    selectedProcess.value = selectedProcess.value.filter((p) => p !== process);
  } else {
    selectedProcess.value.push(process);
  }
}

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}
</script>

<template>
  <div
    data-testid="flow"
    class="overflow-hidden px-6 py-4 sm:px-6 lg:px-6 bg-white rounded-lg border-2 border-neutral-300 w-full"
  >
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="relative">
            <div
              v-if="selectedProcess.length > 0"
              class="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12"
            >
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
                  <th
                    scope="col"
                    class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Responsável
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Candidato
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Cargo
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span class="sr-only">Editar</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="(process, index) in processes"
                  :key="index"
                  :class="{ 'bg-gray-50': selectedProcess.includes(process) }"
                >
                  <td class="relative px-7 sm:w-12 sm:px-6">
                    <div
                      v-if="selectedProcess.includes(process)"
                      class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"
                    ></div>
                    <input
                      type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      :value="process.getCandidato()"
                      :checked="selectedProcess.includes(process)"
                      @change="toggleprocess(process as Process)"
                    />
                  </td>
                  <td
                    :class="
                      classNames(
                        'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                        {
                          'text-indigo-600': selectedProcess.includes(process),
                          'text-gray-900': !selectedProcess.includes(process),
                        }
                      )
                    "
                  >
                    {{ process.getResponsavel() }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ process.getCandidato() }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ process.getCargo() }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ process.getStatus() }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="processes.length === 0" class="w-full flex gap-4 text-neutral-500">
              <p>Ainda não há processos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

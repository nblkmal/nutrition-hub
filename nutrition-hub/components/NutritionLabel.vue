<script setup lang="ts">
import { computed } from 'vue'
import type { Food } from '~/types'

const props = defineProps<{
  food: Food
}>()

// Daily Value reference (based on FDA 2000 calorie diet)
const DAILY_VALUES: Record<string, number> = {
  protein: 50,
  carbohydrates: 300,
  fat: 78,
  fiber: 28
}

// Calculate percentage of daily value
const calculatePercentage = (value: number, dailyValue: number): number => {
  if (dailyValue === 0) return 0
  const percentage = Math.round((value / dailyValue) * 100)
  return Math.min(percentage, 100)
}

// Computed percentages for main macronutrients
const proteinPercentage = computed(() => calculatePercentage(props.food.proteinG, DAILY_VALUES.protein))
const carbsPercentage = computed(() => calculatePercentage(props.food.carbohydratesTotalG, DAILY_VALUES.carbohydrates))
const fatPercentage = computed(() => calculatePercentage(props.food.fatTotalG, DAILY_VALUES.fat))
const fiberPercentage = computed(() => calculatePercentage(props.food.fiberG, DAILY_VALUES.fiber))

// Color coding based on percentage
// Green: >= 50% (high - good source)
// Yellow: >= 20% (medium - moderate)
// Red: < 20% (low - may need more)
const getColor = (percentage: number): 'green' | 'yellow' | 'red' => {
  if (percentage >= 50) return 'green'
  if (percentage >= 20) return 'yellow'
  return 'red'
}

const proteinColor = computed(() => getColor(proteinPercentage.value))
const carbsColor = computed(() => getColor(carbsPercentage.value))
const fatColor = computed(() => getColor(fatPercentage.value))
const fiberColor = computed(() => getColor(fiberPercentage.value))
</script>

<template>
  <section
    class="nutrition-label w-full bg-white font-sans max-w-[400px] border-2 border-black p-4"
    aria-label="Nutrition Facts"
  >
    <!-- Title -->
    <h2 class="text-2xl font-bold border-b-4 border-black mb-2 pb-1">
      Nutrition Facts
    </h2>

    <!-- Serving Size -->
    <div class="border-b border-black pb-2 mb-2">
      <p class="font-medium">
        Serving Size: <span class="font-bold">100g</span>
      </p>
    </div>

    <!-- Calories Section - Prominent Display -->
    <div class="border-b-4 border-black pb-3 mb-3">
      <h3 class="sr-only">Calorie Information</h3>
      <div class="flex justify-between items-end">
        <span class="font-bold text-xl">Calories</span>
        <span class="text-[2rem] font-bold">{{ food.calories }}</span>
      </div>
    </div>

    <!-- Macronutrients with Circular Progress -->
    <div class="space-y-4">
      <!-- Protein -->
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <p class="font-bold">
            Protein <span class="font-normal">{{ food.proteinG }}g</span>
          </p>
          <p class="text-sm" :class="{
            'text-green-600': proteinPercentage >= 50,
            'text-amber-600': proteinPercentage >= 20 && proteinPercentage < 50,
            'text-red-600': proteinPercentage < 20
          }">
            {{ proteinPercentage }}% of daily value
          </p>
        </div>
        <UCircularProgress
          :value="proteinPercentage"
          :color="proteinColor"
          size="md"
          :aria-label="`Protein: ${proteinPercentage}% of daily value`"
        />
      </div>

      <!-- Carbohydrates -->
      <div class="border-t border-gray-300 pt-3">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="font-bold">
              Total Carbohydrates <span class="font-normal">{{ food.carbohydratesTotalG }}g</span>
            </p>
            <p class="text-sm" :class="{
                'text-green-600': carbsPercentage >= 50,
                'text-amber-600': carbsPercentage >= 20 && carbsPercentage < 50,
                'text-red-600': carbsPercentage < 20
              }">
              {{ carbsPercentage }}% of daily value
            </p>
          </div>
          <UCircularProgress
            :value="carbsPercentage"
            :color="carbsColor"
            size="md"
            :aria-label="`Total Carbohydrates: ${carbsPercentage}% of daily value`"
          />
        </div>
        <div class="ml-4 mt-2 space-y-1">
          <!-- Dietary Fiber -->
          <div class="flex items-center justify-between pl-4 border-l-2 border-gray-300">
            <div>
              <p class="font-medium">
                Dietary Fiber <span class="font-normal">{{ food.fiberG }}g</span>
              </p>
            <p class="text-sm" :class="{
                'text-green-600': fiberPercentage >= 50,
                'text-amber-600': fiberPercentage >= 20 && fiberPercentage < 50,
                'text-red-600': fiberPercentage < 20
              }">
                {{ fiberPercentage }}% of daily value
              </p>
            </div>
            <UCircularProgress
              :value="fiberPercentage"
              :color="fiberColor"
              size="md"
              :aria-label="`Dietary Fiber: ${fiberPercentage}% of daily value`"
            />
          </div>
          <!-- Sugars -->
          <div class="pl-4 border-l-2 border-gray-300">
            <p class="font-medium">
              Sugars <span class="font-normal">{{ food.sugarG }}g</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Total Fat -->
      <div class="border-t border-gray-300 pt-3">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="font-bold">
              Total Fat <span class="font-normal">{{ food.fatTotalG }}g</span>
            </p>
            <p class="text-sm" :class="{
                'text-green-600': fatPercentage >= 50,
                'text-amber-600': fatPercentage >= 20 && fatPercentage < 50,
                'text-red-600': fatPercentage < 20
              }">
              {{ fatPercentage }}% of daily value
            </p>
          </div>
          <UCircularProgress
            :value="fatPercentage"
            :color="fatColor"
            size="md"
            :aria-label="`Total Fat: ${fatPercentage}% of daily value`"
          />
        </div>
        <div class="ml-4 mt-2 pl-4 border-l-2 border-gray-300">
          <p class="font-medium">
            Saturated Fat <span class="font-normal">{{ food.fatSaturatedG }}g</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="border-t-4 border-black my-4"></div>

    <!-- Micronutrients -->
    <div class="space-y-1">
      <div class="flex justify-between">
        <span class="font-bold">Sodium</span>
        <span>{{ food.sodiumMg }}mg</span>
      </div>
      <div class="flex justify-between">
        <span class="font-bold">Potassium</span>
        <span>{{ food.potassiumMg }}mg</span>
      </div>
      <div class="flex justify-between">
        <span class="font-bold">Cholesterol</span>
        <span>{{ food.cholesterolMg }}mg</span>
      </div>
    </div>

    <!-- Daily Value Reference -->
    <div class="border-t border-black mt-4 pt-2 text-xs text-gray-600">
      <p>* Percent Daily Values are based on a 2,000 calorie diet.</p>
    </div>
  </section>
</template>

<style scoped>
.nutrition-label {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
</style>

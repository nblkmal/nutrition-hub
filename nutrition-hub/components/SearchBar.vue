<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import type { Food } from '~/types'
import type { UseFoodSearchReturn } from '~/types/composables'

// Use composable for search functionality
const { foods, loading, searchFoods } = useFoodSearch() as UseFoodSearchReturn

// Local state
const query = ref('')
const showDropdown = ref(false)
const selectedIndex = ref(0)
const searchContainer = ref<HTMLElement | null>(null)

/**
 * Watch query changes and trigger search
 */
watch(query, (newQuery) => {
  selectedIndex.value = 0

  if (!newQuery || newQuery.length < 2) {
    showDropdown.value = false
    return
  }

  showDropdown.value = true

  // Composable already debounces at 300ms - call directly
  searchFoods(newQuery)
})

/**
 * Handle click outside to close dropdown
 */
const handleClickOutside = (event: MouseEvent) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target as Node)) {
    showDropdown.value = false
  }
}

/**
 * Navigate to food detail page
 */
const navigateToFood = (food: Food) => {
  navigateTo(`/foods/${food.slug}`)
  showDropdown.value = false
  query.value = ''
}

/**
 * Handle keyboard navigation
 */
const handleKeydown = (e: KeyboardEvent) => {
  if (!showDropdown.value) return

  const maxIndex = foods.value.length - 1

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, maxIndex)
    scrollSelectedIntoView()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
    scrollSelectedIntoView()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (foods.value[selectedIndex.value]) {
      navigateToFood(foods.value[selectedIndex.value])
    }
  } else if (e.key === 'Escape') {
    showDropdown.value = false
  }
  // Tab handled natively - moves focus out, closes dropdown via click-outside
}

/**
 * Scroll selected item into view
 */
const scrollSelectedIntoView = () => {
  // Get all option elements and scroll the selected one into view
  const options = searchContainer.value?.querySelectorAll('[role="option"]')
  if (options && options[selectedIndex.value]) {
    options[selectedIndex.value].scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }
}

/**
 * Handle mouse enter on result item
 */
const handleMouseEnter = (index: number) => {
  selectedIndex.value = index
}

// Setup click outside handler
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Computed
const displayFoods = computed(() => foods.value.slice(0, 10))
const showResults = computed(() =>
  showDropdown.value && (displayFoods.value.length > 0 || loading.value)
)
</script>

<template>
  <div ref="searchContainer" class="relative w-full max-w-2xl mx-auto">
    <!-- Search Input -->
    <UInput
      v-model="query"
      type="text"
      placeholder="Search foods..."
      size="lg"
      icon="i-heroicons-magnifying-glass"
      aria-label="Search foods"
      aria-describedby="search-instructions"
      @keydown="handleKeydown"
    />

    <!-- Screen Reader Instructions -->
    <p id="search-instructions" class="sr-only">
      Use arrow keys to navigate, Enter to select, Escape to close
    </p>

    <!-- Autocomplete Dropdown -->
    <div
      v-if="showResults"
      class="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      role="listbox"
    >
      <!-- Loading State -->
      <div v-if="loading" class="p-4">
        <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-3">
          <UIcon name="i-heroicons-arrow-path" class="animate-spin w-5 h-5" />
          <span>Searching...</span>
        </div>
        <!-- Skeleton items -->
        <div class="space-y-2">
          <USkeleton v-for="i in 5" :key="i" class="h-12 w-full rounded" />
        </div>
      </div>

      <!-- Results List -->
      <ul v-else role="listbox">
        <li
          v-for="(food, index) in displayFoods"
          :key="food.id"
          role="option"
          :aria-selected="index === selectedIndex"
          class="px-4 py-3 cursor-pointer transition-colors duration-150"
          :class="[
            index === selectedIndex
              ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500'
              : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
          ]"
          @click="navigateToFood(food)"
          @mouseenter="handleMouseEnter(index)"
        >
          <!-- Food Name -->
          <p class="font-medium text-gray-900 dark:text-gray-100">
            {{ food.name }}
          </p>
          <!-- Nutrition Preview -->
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ food.proteinG }}g protein · {{ food.calories }} cal
          </p>
        </li>

        <!-- No Results -->
        <li
          v-if="displayFoods.length === 0"
          class="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
        >
          <p>No foods found for "{{ query }}"</p>
          <p class="text-sm mt-1">Try a different search term</p>
        </li>
      </ul>
    </div>
  </div>
</template>

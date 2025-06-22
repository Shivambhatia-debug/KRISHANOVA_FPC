"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const categories = [
  { id: "snacks", label: "Healthy Snacks", count: 24 },
  { id: "beverages", label: "Beverages", count: 12 },
  { id: "breakfast", label: "Breakfast", count: 18 },
  { id: "protein", label: "Protein Foods", count: 15 },
  { id: "organic", label: "Organic Range", count: 32 },
]

const brands = [
  { id: "freshbites", label: "FreshBites", count: 45 },
  { id: "naturals", label: "Pure Naturals", count: 23 },
  { id: "organic-co", label: "Organic Co.", count: 18 },
  { id: "healthy-bites", label: "Healthy Bites", count: 12 },
]

const attributes = [
  { id: "organic", label: "Organic" },
  { id: "gluten-free", label: "Gluten Free" },
  { id: "vegan", label: "Vegan" },
  { id: "no-sugar", label: "No Added Sugar" },
  { id: "high-protein", label: "High Protein" },
  { id: "low-sodium", label: "Low Sodium" },
]

export function ProductFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId])
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId))
    }
  }

  const handleAttributeChange = (attributeId: string, checked: boolean) => {
    if (checked) {
      setSelectedAttributes([...selectedAttributes, attributeId])
    } else {
      setSelectedAttributes(selectedAttributes.filter((id) => id !== attributeId))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedAttributes([])
    setPriceRange([0, 1000])
  }

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + selectedAttributes.length

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Active Filters ({activeFiltersCount})</h3>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId)
              return (
                <Badge key={categoryId} variant="secondary" className="gap-1">
                  {category?.label}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(categoryId, false)} />
                </Badge>
              )
            })}
            {selectedBrands.map((brandId) => {
              const brand = brands.find((b) => b.id === brandId)
              return (
                <Badge key={brandId} variant="secondary" className="gap-1">
                  {brand?.label}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleBrandChange(brandId, false)} />
                </Badge>
              )
            })}
            {selectedAttributes.map((attributeId) => {
              const attribute = attributes.find((a) => a.id === attributeId)
              return (
                <Badge key={attributeId} variant="secondary" className="gap-1">
                  {attribute?.label}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleAttributeChange(attributeId, false)} />
                </Badge>
              )
            })}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-semibold">Price Range</h3>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-semibold">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <Label htmlFor={category.id} className="text-sm cursor-pointer">
                  {category.label}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">({category.count})</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div className="space-y-4">
        <h3 className="font-semibold">Brands</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={brand.id}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                />
                <Label htmlFor={brand.id} className="text-sm cursor-pointer">
                  {brand.label}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">({brand.count})</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Attributes */}
      <div className="space-y-4">
        <h3 className="font-semibold">Dietary & Health</h3>
        <div className="space-y-3">
          {attributes.map((attribute) => (
            <div key={attribute.id} className="flex items-center space-x-2">
              <Checkbox
                id={attribute.id}
                checked={selectedAttributes.includes(attribute.id)}
                onCheckedChange={(checked) => handleAttributeChange(attribute.id, checked as boolean)}
              />
              <Label htmlFor={attribute.id} className="text-sm cursor-pointer">
                {attribute.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

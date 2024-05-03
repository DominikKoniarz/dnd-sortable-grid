"use client";

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	rectSortingStrategy,
	SortableContext,
	sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useState } from "react";

export default function Wrapper({
	initialItems,
}: {
	initialItems: { id: string }[];
}) {
	const [items, setItems] = useState(initialItems);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (!over) return;

		if (active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.findIndex(
					(item) => item.id === active.id,
				);
				const newIndex = items.findIndex((item) => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}

	const grid = items.map((item, index) => (
		<SortableItem key={item.id} id={item.id} />

		// <SortableItem key={`key-${index}`} id={item.id} />

		// This is the whole point of this repo.
		// The key prop have to be unique. It cannot be index of item in the array.

		// So this is wrong:
		// <SortableItem key={`key-${index}`} id={item.id} />
	));

	return (
		<div className="grid grid-cols-3 gap-4 border">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={items} strategy={rectSortingStrategy}>
					{grid}
				</SortableContext>
			</DndContext>
		</div>
	);
}

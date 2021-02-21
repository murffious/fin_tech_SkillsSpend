import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useDroppable, useSensors, useSensor, } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy, } from '@dnd-kit/sortable';
import { Item} from './Item';
import { List} from './List';
const defaultInitializer = (index) => index;
function createRange(length, initializer = defaultInitializer) {
    return [...new Array(length)].map((_, index) => initializer(index));
}
function DroppableContainer({ children, columns = 1, id, items, getStyle = () => ({}), }) {
    const { over, isOver, setNodeRef } = useDroppable({
        id,
    });
    const isOverContainer = isOver || (over ? items.includes(over.id) : false);
    return (React.createElement(List, { ref: setNodeRef, style: getStyle({ isOverContainer }), columns: columns }, children));
}
export const defaultContainerStyle = ({ isOverContainer, }) => ({
    marginTop: 40,
    backgroundColor: isOverContainer
        ? 'rgb(235,235,235,1)'
        : 'rgba(246,246,246,1)',
});
export const VOID_ID = 'void';
export function MultipleContainers({ adjustScale = false, itemCount = 3, collisionDetection = closestCorners, columns, handle = false, items: initialItems, getItemStyles = () => ({}), getContainerStyle = defaultContainerStyle, wrapperStyle = () => ({}), modifiers, renderItem, strategy = verticalListSortingStrategy, trashable = false, vertical = false, }) {
    const [items, setItems] = useState(() => initialItems !== null && initialItems !== void 0 ? initialItems : {
        A: createRange(itemCount, (index) => `A${index + 1}`),
        B: createRange(itemCount, (index) => `B${index + 1}`),
        C: createRange(itemCount, (index) => `C${index + 1}`),
        D: createRange(itemCount, (index) => `D${index + 1}`),
        [VOID_ID]: [],
    });
    const [dragOverlaydItems, setClonedItems] = useState(null);
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    }));
    const findContainer = (id) => {
        if (id in items) {
            return id;
        }
        return Object.keys(items).find((key) => items[key].includes(id));
    };
    const getIndex = (id) => {
        const container = findContainer(id);
        if (!container) {
            return -1;
        }
        const index = items[container].indexOf(id);
        return index;
    };
    return (React.createElement(DndContext, { sensors: sensors, collisionDetection: collisionDetection, onDragStart: ({ active }) => {
            setActiveId(active.id);
            setClonedItems(items);
        }, onDragOver: ({ active, over, draggingRect }) => {
            const overId = (over === null || over === void 0 ? void 0 : over.id) || VOID_ID;
            const overContainer = findContainer(overId);
            const activeContainer = findContainer(active.id);
            if (!overContainer || !activeContainer) {
                return;
            }
            if (activeContainer !== overContainer) {
                setItems((items) => {
                    const activeItems = items[activeContainer];
                    const overItems = items[overContainer];
                    const overIndex = overItems.indexOf(overId);
                    const activeIndex = activeItems.indexOf(active.id);
                    let newIndex;
                    if (overId in items) {
                        newIndex = overItems.length + 1;
                    }
                    else {
                        const isBelowLastItem = over &&
                            overIndex === overItems.length - 1 &&
                            draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;
                        const modifier = isBelowLastItem ? 1 : 0;
                        newIndex =
                            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
                    }
                    return Object.assign(Object.assign({}, items), { [activeContainer]: [
                            ...items[activeContainer].filter((item) => item !== active.id),
                        ], [overContainer]: [
                            ...items[overContainer].slice(0, newIndex),
                            items[activeContainer][activeIndex],
                            ...items[overContainer].slice(newIndex, items[overContainer].length),
                        ] });
                });
            }
        }, onDragEnd: ({ active, over }) => {
            const activeContainer = findContainer(active.id);
            if (!activeContainer) {
                setActiveId(null);
                return;
            }
            const overId = (over === null || over === void 0 ? void 0 : over.id) || VOID_ID;
            if (overId === VOID_ID) {
                setItems((items) => (Object.assign(Object.assign({}, (trashable && (over === null || over === void 0 ? void 0 : over.id) === VOID_ID ? items : dragOverlaydItems)), { [VOID_ID]: [] })));
                setActiveId(null);
                return;
            }
            const overContainer = findContainer(overId);
            if (activeContainer && overContainer) {
                const activeIndex = items[activeContainer].indexOf(active.id);
                const overIndex = items[overContainer].indexOf(overId);
                if (activeIndex !== overIndex) {
                    setItems((items) => (Object.assign(Object.assign({}, items), { [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex) })));
                }
            }
            setActiveId(null);
        }, onDragCancel: () => {
            if (dragOverlaydItems) {
                // Reset items to their original state in case items have been
                // Dragged across containrs
                setItems(dragOverlaydItems);
            }
            setActiveId(null);
            setClonedItems(null);
        }, modifiers: modifiers },
        React.createElement("div", { style: {
                display: 'inline-grid',
                boxSizing: 'border-box',
                padding: '0px 20px',
                gridAutoFlow: vertical ? 'row' : 'column',
            } }, Object.keys(items)
            .filter((key) => key !== VOID_ID)
            .map((containerId) => (React.createElement(SortableContext, { key: containerId, items: items[containerId], strategy: strategy },
            React.createElement(DroppableContainer, { id: containerId, columns: columns, items: items[containerId], getStyle: getContainerStyle }, items[containerId].map((value, index) => {
                return (React.createElement(SortableItem, { key: value, id: value, index: index, handle: handle, style: getItemStyles, wrapperStyle: wrapperStyle, renderItem: renderItem, containerId: containerId, getIndex: getIndex }));
            })))))),
        createPortal(React.createElement(DragOverlay, { adjustScale: adjustScale }, activeId ? (React.createElement(Item, { value: activeId, handle: handle, style: getItemStyles({
                containerId: findContainer(activeId),
                overIndex: -1,
                index: getIndex(activeId),
                value: activeId,
                isSorting: activeId !== null,
                isDragging: true,
                isDragOverlay: true,
            }), color: getColor(activeId), wrapperStyle: wrapperStyle({ index: 0 }), renderItem: renderItem, dragOverlay: true })) : null), document.body),
        trashable && activeId ? React.createElement(Trash, null) : null));
}
function getColor(id) {
    switch (id[0]) {
        case 'A':
            return '#7193f1';
        case 'B':
            return '#ffda6c';
        case 'C':
            return '#00bcd4';
        case 'D':
            return '#ef769f';
    }
    return undefined;
}
function Trash() {
    const { setNodeRef, isOver } = useDroppable({
        id: VOID_ID,
    });
    return (React.createElement("div", { ref: setNodeRef, style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            left: '50%',
            marginLeft: -150,
            bottom: 20,
            width: 300,
            height: 60,
            borderRadius: 5,
            border: '1px solid',
            borderColor: isOver ? 'red' : '#DDD',
        } }, "Drop here to delete"));
}
function SortableItem({ id, index, handle, renderItem, style, containerId, getIndex, wrapperStyle, }) {
    const { setNodeRef, listeners, isDragging, isSorting, over, overIndex, transform, transition, } = useSortable({
        id,
    });
    const mounted = useMountStatus();
    const mountedWhileDragging = isDragging && !mounted;
    return (React.createElement(Item, { ref: setNodeRef, value: id, dragging: isDragging, sorting: isSorting, handle: handle, index: index, wrapperStyle: wrapperStyle({ index }), style: style({
            index,
            value: id,
            isDragging,
            isSorting,
            overIndex: over ? getIndex(over.id) : overIndex,
            containerId,
        }), color: getColor(id), transition: transition, transform: transform, fadeIn: mountedWhileDragging, listeners: listeners, renderItem: renderItem }));
}
function useMountStatus() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 500);
        return () => clearTimeout(timeout);
    }, []);
    return isMounted;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { useEffect, useState, useMemo } from "react";
import { deleteIngredient, getAllIngredients } from "@/api";
import { Info } from "@icon-park/react";
import {
	Column,
	Table,
	useReactTable,
	createColumnHelper,
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues,
	// getPaginationRowModel,
	getSortedRowModel,
	flexRender,
} from "@tanstack/react-table";
import { Ingredient } from "@/types/ingredientTypes";
import { ButtonDelete } from "@/Components/Atoms/ButtonDelete";
import toast from "react-hot-toast";
import axios from "axios";

const columnHelper = createColumnHelper<Ingredient>();

export const PageAllIngredients = () => {
	const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [renderAgain, setRenderAgain] = useState(false);
	useEffect(() => {
		(async () => {
			setRenderAgain(false);
			const res = await getAllIngredients();
			setAllIngredients(res.data.foundedIngredients);
		})();
	}, [renderAgain]);

	const handleDeleteIngredient = (ingredientId: string | undefined) => {
		if (typeof ingredientId === "string") {
			deleteIngredient(ingredientId)
				.then((deletedIngredient) => {
					console.log("🚀 ~ deleteIngredient ~ deletedIngredient:", deletedIngredient);
					setRenderAgain(true);
					toast.success(deletedIngredient.data.message);
				})
				.catch((error) => {
					if (axios.isAxiosError(error)) {
						toast.error(error.response?.data.message);
					} else {
						toast.error("Something went wrong!");
					}
				});
		}
	};

	const columns = [
		columnHelper.accessor((row) => row.name, {
			id: "ingredient-table-name",
			cell: (props) => (
				<div className="flex gap-2 items-center">
					<ButtonDelete
						renderComponent="allIngredients"
						btnTextOrElement={<Info theme="outline" size="12" className="text-accent" />}
						nameOfItemToDelete={props.row.original.name}
						editLink={`/ingredients/${props.row.original._id}`}
						handleDelete={() => handleDeleteIngredient(props.row.original._id)}
					/>

					<span className="font-semibold text-accent">{props.getValue()}</span>
				</div>
			),
			header: () => "Name",
		}),
		columnHelper.accessor((row) => row.category, {
			id: "ingredient-table-category",
			cell: (info) => <span className="text-xs italic">{info.getValue()}</span>,
			header: () => "Category",
		}),
		columnHelper.accessor((row) => row.quantity, {
			id: "ingredient-table-quantity",
			cell: (info) => info.getValue(),
			header: () => "Quantity",
		}),
		columnHelper.accessor((row) => row.unit, {
			id: "ingredient-table-unit",
			cell: (info) => info.getValue(),
			header: () => "Unit",
		}),
		columnHelper.accessor((row) => row.calories, {
			id: "ingredient-table-calories",
			cell: (info) => info.getValue(),
			header: () => "Calories",
		}),
		columnHelper.accessor((row) => row.fat, {
			id: "ingredient-table-fat",
			cell: (info) => info.getValue(),
			header: () => "Fat",
		}),
		columnHelper.accessor((row) => row.carbs, {
			id: "ingredient-table-carbs",
			cell: (info) => info.getValue(),
			header: () => "Carbs",
		}),
		columnHelper.accessor((row) => row.protein, {
			id: "ingredient-table-protein",
			cell: (info) => info.getValue(),
			header: () => "Protein",
		}),
		columnHelper.accessor((row) => row.fiber, {
			id: "ingredient-table-fiber",
			cell: (info) => info.getValue(),
			header: () => "Fiber",
		}),
	];

	const table = useReactTable({
		data: allIngredients,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			columnFilters,
		},
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		// getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		// debugTable: true,
		// debugHeaders: true,
		// debugColumns: false,
	});

	return (
		<>
			<NavigationHeader pageName="All Ingredients" />
			<div className="p-2 overflow-x-auto">
				<table className="table table-zebra">
					<thead className="bg-neutral">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<th key={header.id} colSpan={header.colSpan} className="align-top">
											{header.isPlaceholder ? null : (
												<>
													<div
														{...{
															className: header.column.getCanSort() ? "cursor-pointer select-none" : "",
															onClick: header.column.getToggleSortingHandler(),
														}}>
														{flexRender(header.column.columnDef.header, header.getContext())}
														{{
															asc: " 🔼",
															desc: " 🔽",
														}[header.column.getIsSorted() as string] ?? null}
													</div>
													{header.column.getCanFilter() ? (
														<div>
															<Filter column={header.column} table={table} />
														</div>
													) : null}
												</>
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="hover">
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

function Filter({ column, table }: { column: Column<any, unknown>; table: Table<any> }) {
	const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

	const columnFilterValue = column.getFilterValue();

	const sortedUniqueValues = useMemo(
		() => (typeof firstValue === "number" ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort()),
		[column.getFacetedUniqueValues()]
	);

	return typeof firstValue === "number" ? (
		<div className="flex flex-col space-y-1 mt-1">
			<DebouncedInput
				type="number"
				min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
				max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
				value={(columnFilterValue as [number, number])?.[0] ?? ""}
				onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
				placeholder={`Min (${column.getFacetedMinMaxValues()?.[0]})`}
				className="w-20 border text-[10px] rounded"
			/>
			<DebouncedInput
				type="number"
				min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
				max={Number(column.getFacetedMinMaxValues()?.[1]) + 1 ?? ""}
				value={(columnFilterValue as [number, number])?.[1] ?? ""}
				onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
				placeholder={`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ""}`}
				className="w-20 border text-[10px] rounded"
			/>
		</div>
	) : (
		<div className="mt-1">
			<datalist id={column.id + "list"}>
				{sortedUniqueValues.map((value: any) => (
					<option value={value} key={value} />
				))}
			</datalist>
			<DebouncedInput
				type="text"
				value={(columnFilterValue ?? "") as string}
				onChange={(value) => column.setFilterValue(value)}
				placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
				className="w-full border text-[10px] rounded"
				list={column.id + "list"}
			/>
			<div className="h-1" />
		</div>
	);
}

// A debounced input react component
function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}

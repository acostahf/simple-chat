"use client";

import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check, Zap, DollarSign } from "lucide-react";
import { cn } from "../../../lib/utils";
import { AIModel } from "../../models/constants/available-models";

interface ModelSelectorProps {
    models: AIModel[];
    selectedModel: string;
    onModelChange: (modelId: string) => void;
    disabled?: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
    models,
    selectedModel,
    onModelChange,
    disabled = false,
}) => {
    const selectedModelData = models.find(
        (model) => model.id === selectedModel
    );

    return (
        <Select.Root
            value={selectedModel}
            onValueChange={onModelChange}
            disabled={disabled}
        >
            <Select.Trigger
                className={cn(
                    "inline-flex items-center justify-between gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50",
                    "min-w-[200px]"
                )}
            >
                <div className="flex items-center gap-2">
                    <div
                        className={cn(
                            "w-2 h-2 rounded-full",
                            selectedModelData?.tags.includes("recommended")
                                ? "bg-green-500"
                                : "bg-blue-500"
                        )}
                    />
                    <Select.Value placeholder="Select a model...">
                        {selectedModelData?.name || "Select a model..."}
                    </Select.Value>
                </div>
                <Select.Icon>
                    <ChevronDown className="h-4 w-4" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    className="z-50 max-h-96 min-w-[300px] overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1 shadow-lg"
                    position="popper"
                    sideOffset={5}
                >
                    <Select.Viewport className="p-1">
                        {models.map((model) => (
                            <Select.Item
                                key={model.id}
                                value={model.id}
                                className="relative flex cursor-default select-none items-start gap-3 rounded-md px-3 py-3 text-sm outline-none data-[highlighted]:bg-slate-100 dark:data-[highlighted]:bg-slate-700 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:bg-blue-900/20"
                            >
                                <div className="flex flex-1 flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={cn(
                                                "w-2 h-2 rounded-full",
                                                model.tags.includes(
                                                    "recommended"
                                                )
                                                    ? "bg-green-500"
                                                    : "bg-blue-500"
                                            )}
                                        />
                                        <Select.ItemText className="font-medium text-slate-900 dark:text-slate-100">
                                            {model.name}
                                        </Select.ItemText>
                                        {model.tags.includes(
                                            "recommended"
                                        ) && (
                                            <span className="rounded bg-green-100 dark:bg-green-900/20 px-1.5 py-0.5 text-xs text-green-700 dark:text-green-300">
                                                Recommended
                                            </span>
                                        )}
                                    </div>

                                    <div className="text-xs text-slate-600 dark:text-slate-400">
                                        {model.description}
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <span>{model.provider}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Zap className="h-3 w-3" />
                                            <span>
                                                {(
                                                    model.contextLength /
                                                    1000
                                                ).toFixed(0)}
                                                K context
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="h-3 w-3" />
                                            <span>
                                                $
                                                {model.pricing.prompt.toFixed(
                                                    4
                                                )}
                                                /1K tokens
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {model.tags
                                            .filter(
                                                (tag) =>
                                                    tag !== "recommended"
                                            )
                                            .map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs text-slate-600 dark:text-slate-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                    </div>
                                </div>

                                <Select.ItemIndicator className="flex h-3.5 w-3.5 items-center justify-center">
                                    <Check className="h-3 w-3" />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};

export { ModelSelector };

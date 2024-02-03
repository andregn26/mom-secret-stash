import React from "react";

type Props = {
    title: string
    children: React.ReactNode;
};

export const FormContainer = ({ title, children }: Props) => {
    return (
        <div className="relative py-3 sm:max-w-xl sm:mx-auto h-full ">
            <div className="hidden sm:flex absolute inset-0 bg-gradient-to-r rounded-sm from-slate-100 to-slate-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg rounded-sm sm:p-20">
                <div className="max-w-md mx-auto">
                    <div>
                        <h2 className="text-2xl font-semibold">{title}</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

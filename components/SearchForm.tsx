import React from 'react'
import SearchFormReset from "@/components/SearchFormReset"
import { Search } from 'lucide-react'
import Form from "next/form";

const SearchForm = ({ query }: { query?: string }) => {
    return (
        <Form action="/"  className="search-form">
            <input
                name="query"
                defaultValue={query}
                className="search-input"
                type="text"
                placeholder="Search Startups..."
            />
            <div className="flex gap-2">
                {query && <SearchFormReset />}

                <button type="submit" className="search-btn text-white">
                    <Search className="size-5" />
                </button>
            </div>
        </Form>
    )
}

export default SearchForm

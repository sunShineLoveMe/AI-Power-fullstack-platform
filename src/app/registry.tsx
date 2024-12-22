'use client'

import { Style_Script } from "next/font/google"
import { useServerInsertedHTML } from "next/navigation"
import React, { useState } from "react"
import { createStyleRegistry, StyleRegistry } from "styled-jsx"

export default function StyledJsxRegistry(
    { children }: { children: React.ReactNode }) {
    const [jsxStyleRegistry] = useState(() => createStyleRegistry())    

    useServerInsertedHTML(() => {
        const styles = jsxStyleRegistry.styles()
        jsxStyleRegistry.flush()
        return <>{styles}</>
    })
    return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>
}
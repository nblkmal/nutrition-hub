import { put } from '@vercel/blob'
import fs from 'fs/promises'
import path from 'path'

const BLOB_STORE_NAME = 'nutrition-hub.db'

/**
 * Upload database file to Vercel Blob
 * @param dbPath - Local path to SQLite database file
 * @returns URL to the uploaded blob
 * @throws Error if fetch fails or upload fails
 */
export async function uploadDatabaseToBlob(dbPath: string): Promise<string> {
  try {
    const file = await fetch(dbPath).then(r => {
      if (!r.ok) throw new Error(`Failed to fetch ${dbPath}: ${r.statusText}`)
      return r.blob()
    })
    const blob = await put(BLOB_STORE_NAME, file, {
      access: 'public',
    })
    return blob.url
  } catch (error) {
    throw new Error(`Failed to upload database to Blob: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Get database file URL from Vercel Blob
 * @returns URL to the database file in Blob storage
 * @throws Error if VERCEL_BLOB_URL environment variable is not set
 */
export function getDatabaseBlobUrl(): string {
  const blobUrl = process.env.VERCEL_BLOB_URL
  if (!blobUrl) {
    throw new Error('VERCEL_BLOB_URL environment variable not set')
  }
  return blobUrl
}

/**
 * Download and cache database file from Blob for local use
 * @param blobUrl - URL from getDatabaseBlobUrl()
 * @param localPath - Local path to save the file
 * @throws Error if fetch fails or file write fails
 */
export async function downloadDatabaseFromBlob(blobUrl: string, localPath: string): Promise<void> {
  try {
    const response = await fetch(blobUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch blob: ${response.statusText}`)
    }
    const blob = await response.blob()
    const buffer = await blob.arrayBuffer()
    // Ensure directory exists
    const dir = path.dirname(localPath)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(localPath, Buffer.from(buffer))
  } catch (error) {
    throw new Error(`Failed to download database from Blob: ${error instanceof Error ? error.message : String(error)}`)
  }
}

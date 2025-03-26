# PowerShell script to convert all .tsx files to .jsx
# This script removes TypeScript type annotations and renames the files

# Get all .tsx files in the src directory
$tsxFiles = Get-ChildItem -Path "src" -Recurse -Filter "*.tsx"

foreach ($file in $tsxFiles) {
    Write-Host "Converting $($file.FullName)..."
    
    # Read the content of the file
    $content = Get-Content -Path $file.FullName -Raw
    
    # Create the new .jsx file path
    $newFilePath = $file.FullName -replace "\.tsx$", ".jsx"
    
    # Write the content to the new file 
    # (we're not doing any content modification - just copying as is since we'll manually fix TypeScript syntax)
    Set-Content -Path $newFilePath -Value $content
    
    # Delete the old .tsx file
    Remove-Item -Path $file.FullName
    
    Write-Host "Created $newFilePath"
}

Write-Host "Conversion complete. You may need to manually remove TypeScript type annotations from the .jsx files." 
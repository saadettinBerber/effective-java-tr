import sys
import fitz

def extract_text(pdf_path, start_page, end_page):
    try:
        doc = fitz.open(pdf_path)
        for page_num in range(start_page - 1, end_page):
            if 0 <= page_num < len(doc):
                page = doc.load_page(page_num)
                print(f"--- PAGE {page_num + 1} ---")
                print(page.get_text())
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python pdf_extractor.py <pdf_path> <start_page> <end_page>")
        sys.exit(1)
        
    pdf_path = sys.argv[1]
    start_page = int(sys.argv[2])
    end_page = int(sys.argv[3])
    
    extract_text(pdf_path, start_page, end_page)

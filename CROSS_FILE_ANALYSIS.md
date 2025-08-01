# 🔗 Cross-File Analysis Feature

## 🎉 **NEW FEATURE: Cross-File Analysis!**

Yoda now analyzes **multiple files together** to detect issues that only become apparent when looking at your entire codebase, not just individual files!

---

## 🧐 **What is Cross-File Analysis?**

**Individual File Analysis** catches issues within a single file:
- Missing type hints
- PEP 8 violations  
- Use of print vs logging

**Cross-File Analysis** catches issues that span multiple files:
- ❌ **Missing imports** (using functions without importing them)
- ❌ **Import inconsistencies** (importing differently across files)
- ❌ **Parameter mismatches** (calling functions with wrong parameter names/order)
- ❌ **Naming conflicts** (same function name, different implementations) 
- ❌ **Architecture issues** (code duplication, tight coupling)

---

## 🚀 **How to Use Cross-File Analysis**

### **Method 1: Command Palette**
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type: **`Yoda: Cross-File Analysis`**
3. Press Enter and watch Yoda analyze your entire codebase! ✨

### **Method 2: Auto-enable in Settings**
1. Open VS Code Settings (`Ctrl+,`)
2. Search for: **`Yoda Cross`**
3. Enable: **`🔗 Enable cross-file analysis`** ✅

---

## 🔍 **What It Detects**

I've created example files that demonstrate cross-file issues. Here's what Yoda will catch:

### **1. 📦 Import Issues**
```python
# user_service.py
from models import User, calculate_discount
# Missing: format_user_name - used below but not imported!

def get_user_display(user):
    return format_user_name(user)  # ❌ NameError waiting to happen
```

### **2. 🔄 Naming Conflicts**
```python
# models.py
def calculate_discount(price, discount_rate):
    return price * (1 - discount_rate)

# user_service.py  
def calculate_discount(amount, percent):  # ❌ Same name, different logic!
    return amount - (amount * percent / 100)
```

### **3. 🔧 Interface Inconsistencies**
```python
# models.py
def process_product(product_id, product_name, price):
    # Function expects these parameter names

# main.py
result = process_product(product_id=1, name="Mouse", price=29.99)  
# ❌ Wrong parameter name: "name" should be "product_name"
```

### **4. 🏗️ Architecture Issues**
```python
# Multiple files creating User objects inconsistently:
user1 = User(1, "John", "john@example.com")      # Positional args
user2 = User(id=1, name="John", email="john@...") # Keyword args  
# ❌ Inconsistent usage patterns across codebase
```

---

## 📋 **Example Cross-File Issues in Your Workspace**

I've created files with intentional cross-file issues:

- **`models.py`** - Data models and utility functions
- **`user_service.py`** - Service that uses models inconsistently  
- **`main.py`** - Main file with import and usage issues

**🔍 Try running cross-file analysis to see what Yoda finds!**

---

## 📺 **Where to See Results**

Cross-file issues appear in the **Problems panel** with special markers:

```
🔗 [Cross-File] Missing import: format_user_name used but not imported (Related: models.py)
🔗 [Cross-File] Naming conflict: calculate_discount has different implementations (Related: models.py)  
🔗 [Cross-File] Parameter mismatch: process_product called with 'name' but expects 'product_name'
🔗 [Cross-File] Inconsistent object creation: User created with different patterns across files
```

**How to view:**
1. Press `Ctrl+Shift+M` to open Problems panel
2. Look for `[Cross-File]` entries
3. Each entry shows which other files are related!

---

## ⚙️ **Configuration Options**

### **Enable/Disable Cross-File Analysis**
```json
{
  "yoda.crossFileAnalysis": true  // Enable cross-file analysis
}
```

### **What Files Are Analyzed**
- **Primary**: All `.py` files in workspace
- **Excludes**: `node_modules/`, virtual environments
- **Minimum**: Requires 2+ Python files

---

## 🎯 **Types of Issues Detected**

| Category | What It Finds | Example |
|----------|---------------|---------|
| **🔗 Import Issues** | Missing imports, unused imports, circular dependencies | `format_user_name` used but not imported |
| **📛 Naming Conflicts** | Same names, different implementations | Multiple `calculate_discount` functions |
| **🔧 Interface Issues** | Wrong parameter names/order, type mismatches | Function called with wrong parameter names |
| **🏗️ Architecture Issues** | Code duplication, tight coupling, inconsistent patterns | User objects created differently everywhere |
| **📦 Dependency Issues** | Missing module dependencies, inconsistent usage | Data models used inconsistently |

---

## 🧪 **Test the Feature**

### **Quick Test:**
1. **Restart VS Code** to load the updated extension
2. **Run Cross-File Analysis**: `Ctrl+Shift+P` → `Yoda: Cross-File Analysis`
3. **Check Results**: Press `Ctrl+Shift+M` to see cross-file issues
4. **Look for**: `[Cross-File]` entries in the Problems panel

### **What You Should See:**
- Import issues in `user_service.py` and `main.py`
- Naming conflicts between files
- Parameter mismatches in function calls
- Inconsistent object creation patterns

---

## ⚡ **Performance Notes**

- **Smart**: Only analyzes when you run the command (not automatic)
- **Efficient**: Groups all files in one AI analysis call
- **Progress**: Shows progress bar during analysis
- **Cancellable**: Can cancel long-running analysis

---

## 🔧 **Advanced Usage**

### **Workspace-Only Issues**
Cross-file analysis detects issues that **individual file analysis misses**:
- ✅ **Single file**: `def calculate_tax(amount): ...` looks fine
- ❌ **Cross-file**: Same function name in 3 different files with different logic!

### **Integration with Regular Analysis**
- **Regular analysis**: Catches individual file issues
- **Cross-file analysis**: Catches multi-file issues  
- **Combined**: Both show in Problems panel together
- **Distinct**: Cross-file issues are clearly marked with `[Cross-File]`

---

## 🎉 **Summary**

**Before**: Yoda analyzed files individually ✅  
**Now**: Yoda analyzes your entire codebase for cross-file issues! 🔗✨

**New Command**: `Yoda: Cross-File Analysis`  
**New Setting**: `yoda.crossFileAnalysis`  
**New Results**: `[Cross-File]` entries in Problems panel

**🧙‍♂️ Now Yoda can see the bigger picture of your codebase and guide you to better architecture!**

---

Try running `Yoda: Cross-File Analysis` right now to see what issues Yoda finds across your Python files! 🚀 
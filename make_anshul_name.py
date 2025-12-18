import bpy
import sys
import os

# Output path
argv = sys.argv
argv = argv[argv.index("--") + 1:] if "--" in argv else []
out_path = argv[0] if argv else os.path.join(os.getcwd(), "anshul_name.glb")

# Delete default objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Add text
bpy.ops.object.text_add(enter_editmode=False, location=(0, 0, 0))
txt = bpy.context.object
txt.data.body = "Anshul Rawat"
txt.data.extrude = 0.12
txt.data.bevel_depth = 0.03
txt.data.bevel_resolution = 4
txt.data.align_x = 'CENTER'
txt.data.align_y = 'CENTER'

# Rotate text upright
txt.rotation_euler[0] = 1.5708  # 90 degrees

# Convert to mesh
bpy.ops.object.convert(target='MESH')
mesh = bpy.context.object

# Smooth shading
for p in mesh.data.polygons:
    p.use_smooth = True

# Create dark gold material
mat = bpy.data.materials.new(name="DarkGold")
mat.use_nodes = True
nodes = mat.node_tree.nodes
links = mat.node_tree.links

# Clear old nodes
for n in nodes:
    nodes.remove(n)

# Create required nodes for Blender 5.0
output = nodes.new("ShaderNodeOutputMaterial")
bsdf = nodes.new("ShaderNodeBsdfPrincipled")

# Set PBR values (working in Blender 5.0)
if "Metallic" in bsdf.inputs:
    bsdf.inputs["Metallic"].default_value = 0.88
if "Roughness" in bsdf.inputs:
    bsdf.inputs["Roughness"].default_value = 0.18
if "Base Color" in bsdf.inputs:
    bsdf.inputs["Base Color"].default_value = (0.44, 0.34, 0.15, 1.0)

# Blender 5 renamed specular to "Specular IOR Level"
if "Specular IOR Level" in bsdf.inputs:
    bsdf.inputs["Specular IOR Level"].default_value = 0.6

# Link BSDF → Output
links.new(bsdf.outputs["BSDF"], output.inputs["Surface"])

mesh.data.materials.append(mat)

# Export GLB
bpy.ops.export_scene.gltf(
    filepath=out_path,
    export_format="GLB",
    use_selection=True,
    export_apply=True
)

print("EXPORTED:", out_path)

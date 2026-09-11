# Architecture

The original manga is the geometric source of truth. A production pipeline should avoid regenerating the entire page.

1. Input validation
2. Resolution normalization
3. Panel segmentation
4. Ink/line extraction
5. Semantic region estimation
6. Color/reference conditioning
7. ML colorization
8. Ink restoration
9. Tiled high-resolution reconstruction
10. Export

### Character consistency
Persist project-level color information:

```json
{
  "characters": {
    "Ren Kazuma": {
      "hair": [20,20,20],
      "eyes": [52,58,64],
      "uniform": [36,36,40]
    }
  }
}
```

Use this as conditioning for every page.

### Difficult fictional scenes
The colorization pipeline can model ordinary fictional visual regions such as blood, wounds and weapons. It should not be designed as a mechanism to bypass another provider's safeguards.

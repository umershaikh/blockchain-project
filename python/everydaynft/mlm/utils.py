# mlm/utils.py

from .models import MLMUser, LevelRequirement

def get_downline_grades(user: MLMUser) -> tuple[int, int, int]:
    """
    Returns (countA, countB, countC) for the user's direct (A),
    second-level (B), and third-level (C) referrals.
    """
    gradeA = MLMUser.objects.filter(upline=user)
    gradeB = MLMUser.objects.filter(upline__in=gradeA)
    gradeC = MLMUser.objects.filter(upline__in=gradeB)

    return (gradeA.count(), gradeB.count(), gradeC.count())

def can_level_up(user: MLMUser) -> bool:
    """
    Checks if user meets the next level's requirements from LevelRequirement.
    """
    current_level = user.level
    next_level = current_level + 1

    try:
        req = LevelRequirement.objects.get(level_number=next_level)
    except LevelRequirement.DoesNotExist:
        # No further level config => can't level up
        return False

    # 1) needed_points
    if user.points < req.needed_points:
        return False

    # 2) valid_grade_a / valid_grade_bc
    a_count, b_count, c_count = get_downline_grades(user)
    if a_count < req.valid_grade_a:
        return False
    if (b_count + c_count) < req.valid_grade_bc:
        return False

    # 3) equity_held if you store user.equity or so
    # if user.equity < req.equity_held:
    #     return False

    return True

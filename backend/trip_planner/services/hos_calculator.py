def validate_day(day: dict) -> bool:
    """
    Validates that all time blocks in a day
    sum to exactly 24.0 hours.
    Raises ValueError if they do not.
    Call this before returning any day in the output.
    """
    total = sum(
        block['end_hour'] - block['start_hour']
        for block in day['time_blocks']
    )
    if abs(total - 24.0) > 0.01:
        raise ValueError(
            f"Day {day['day_number']} time blocks "
            f"sum to {total:.2f} hours, not 24.0. "
            f"Blocks: {day['time_blocks']}"
        )
    return True


def split_block_at_midnight(block: dict, day_number: int) -> list:
    """
    If a block crosses midnight (end_hour > 24),
    split it into two blocks:
      - First block: start_hour to 24.0 (current day)
      - Second block: 0.0 to remainder (next day)
    
    Example:
      Input:  {start_hour: 18.5, end_hour: 28.5}
      Output: [
        {start_hour: 18.5, end_hour: 24.0},  # day N
        {start_hour: 0.0,  end_hour: 4.5}    # day N+1
      ]
    """
    if block['end_hour'] <= 24.0:
        return [block]
    
    first_part = {**block, 'end_hour': 24.0}
    second_part = {
        **block,
        'start_hour': 0.0,
        'end_hour': block['end_hour'] - 24.0,
        'day_number': day_number + 1
    }
    return [first_part, second_part]
